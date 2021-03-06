# 後端資料類別
使用 @XXX 的表示法參照系統中的其他 object

ongoing: https://hackmd.io/RSUvfVULSfiXGtgiiFQNsw

## 內容分析
### 從 P37
來看，出現的資訊有
1. 特定單一站點（？）或是任何可視為 unit 的實體的資料摘要
    - 需要用到 Document Detail API (前提是 Document Detail 存了 logical location)
2. 近期編輯的邏輯層檔案
    - 原則上每個邏輯層檔案應該都是單一 Upload Session
    - Document List group by Upload Session ID
    - 開啟時用 physical path 去 join Document Detail，
      但 NoSQL join 很沒效益，應該在上傳資料時就把 Upload Session ID 存進 Document Detail 裡？
    - 需要另外針對每個 Upload Session 前一次被 @使用者 存取的時間
3. 以計畫為 unit 的邏輯層目錄
    - 重新組織邏輯目錄時，必須針對每個 Document Detail item 與 File Metadata item 修改內容
    - 對 Document DB 來說相對吃重（不能局部 update，一定要重傳整份）
    - 批次更新都要設法避開非強一致性帶來的問題

### 第 40 頁
***警告***：目前本文與其他兩篇文的用詞混淆了一些東西，需要進一步整理。如 Document Detail API 與 Document List API 的 Document 概念指的其實是 Image Detail (annotation) 與 Image List。Upload Session 對應的 records 會被包裝成虛擬 spreadsheet，也會有自己所屬的邏輯路徑，這是目前未討論的概念(Updated：已增補相關內容，見 https://hackmd.io/RSUvfVULSfiXGtgiiFQNsw?both#Upload-Session-Image-File-List)。虛擬 spreadsheet 內的資訊則應維持恆定不變，以供計算影像的實體路徑。

### 第 48 頁
資料檢核如果在資料寫入時進行，可能會有反應時間太長的問題。更加不可能在前端做。也許會在後端排程進行？以 virtual spreadsheet 為單位，先上 write lock，然後程式中 cache 資料標準，以加速並避免被資料更新或標準更新影響。Virtual spreadsheet 上可加入前次完成檢核時間，系統依此排序，在資料更新時間或資料標準更新時間晚於前次完成檢核時間時，排程於深夜檢核之類。使用者也可以手動觸發檢核流程。


## 內容類別
目前分為
- Annotation
- File Metadata
- Upload Session File List
- Duplicated File List

### Image Detail (Annotation)
- 請見 https://hackmd.io/oTNhuqP5TWy64kHWic3u6Q#%E7%8F%BE%E6%9C%89%E7%9A%84-mongodb-%E4%B8%8A%E7%9A%84%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B
### Image File Metadata (item in Document List)
- 相機相關
    - 時間 Created / Updated Time
    - @相機型號 Camera Model (待確認)
    - 相機序號 Camera ID (***NOT PLOT ID***)
    - 光圈、快門、焦距與其他拍照設定
    - 月相（有些相機提供此服務。可反查，不是那麼必要）
- 計畫相關（只存關鍵資訊）
    - 計畫代稱 (@計畫ID)
    - @空間尺度（大、中、小等，是否需要規範？）
- 檔案管理
    - 上傳時間
    - 上傳者 (@使用者)
    - Unique
        - Upload Session ID (用 UUIDv4 就好)
        - 邏輯位置 Logical location (初始值等同於 physical location)
    - Upload Session Scope Unique
        - 上傳者電腦上 LS 跑出的相對路徑 relative location (來自 spreadsheet)
    - Primary Key
        - 實體位置 Physical location (***NEED TO BE PERSISTENT***)

### Upload Session Image File List
- 需要這個資料類別的簡單理由是「維持資料與檔案綁定的完整性」，討論請參照：
    - https://hackmd.io/Olot8hzcR9CFgrKMK9022g#%E9%87%8D%E8%A4%87%E8%B3%87%E6%96%99%E7%AE%A1%E7%90%86%E5%8E%9F%E5%89%87-UPDATED-2018-07-18
    - https://hackmd.io/Olot8hzcR9CFgrKMK9022g#Write-lock-UPDATED-2018-07-18
    - 衍生出虛擬檔案與邏輯路徑 upload session virtual excels
- 內容
    - Upload Session ID
    - Physical Locations (array)
        - Physical Location
        - Last Access (後端要控制好不要噴出無關人等的 last access info)
            - @使用者
            - @DateTime
    - Logical location of this upload session (virtual spreadsheet), file name included.
    - dateTime last validated

### Duplicated Image List
- 目的是保護重複照片不會被刪光光（給後端參考用，至少留下一張），討論同見：
    - https://hackmd.io/Olot8hzcR9CFgrKMK9022g#%E9%87%8D%E8%A4%87%E8%B3%87%E6%96%99%E7%AE%A1%E7%90%86%E5%8E%9F%E5%89%87-UPDATED-2018-07-18
- 內容
    - Duplication Session ID
    - duplicated (array)
        - physical location
        - delete flag

## APIs
### Document List API
Query 後回傳 List of File Metadata Structure (可取 subset)
- 讀取資料時的權限流程
    - OAuth 登入
    - 後端任務
        - 找出使用者有權讀取的計畫
        - 把 @計畫ID 加入 query 條件

### Document Detail API
- 讀取資料時的權限流程
    - OAuth 登入
    - 後端任務
        - 找出使用者有權讀取的計畫
        - 把 @計畫ID 加入 query 條件
