import React from 'react';
import ReactDOM from 'react-dom';

import JqxRibbon from '../../../jqwidgets-react/react_jqxribbon.js';
import JqxPanel from '../../../jqwidgets-react/react_jqxpanel.js';

class App extends React.Component {
    componentDidMount() {
        this.refs.myRibbon.on('select', (event) => {
            var args = event.args;
            var selectedIndex = event.args.selectedIndex;
            this.refs.log.prepend('<div style="margin-top: 5px;">Selected: ' + selectedIndex + '</div>');
        });

        this.refs.myRibbon.on('unselect', (event) => {
            var args = event.args;
            var unselectedIndex = event.args.unselectedIndex;
            this.refs.log.prepend('<div style="margin-top: 5px;">Unselected: ' + unselectedIndex + '</div>');
        });
    }
    render() {
        let ribbonHTML = `
        <ul>
            <li style='margin-left: 30px;'>Browse Books</li>
            <li>Shipping</li>
            <li>About Us</li>
        </ul>
        <div>
            <div>
                <table>
                    <tr>
                        <td>
                            <b>Fiction</b>
                        </td>
                        <td>
                            <b>Biography</b>
                        </td>
                        <td>
                            <b>Science</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Adventure</a>
                        </td>
                        <td>
                            <a href='#'>Biography: General</a>
                        </td>
                        <td>
                            <a href='#'>Astronomy</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Classics</a>
                        </td>
                        <td>
                            <a href='#'>Diaries, Letters & Journals</a>
                        </td>
                        <td>
                            <a href='#'>Biology</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Historical Fiction</a>
                        </td>
                        <td>
                            <a href='#'>Memoirs</a>
                        </td>
                        <td>
                            <a href='#'>Geography</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Romance</a>
                        </td>
                        <td>
                            <b>Food & Drink</b>
                        </td>
                        <td>
                            <a href='#'>Mathematics</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Science Fiction</a>
                        </td>
                        <td>
                            <a href='#'>General Cookery</a>
                        </td>
                        <td>
                            <a href='#'>Physics</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Thrillers</a>
                        </td>
                        <td>
                            <a href='#'>National Cuisine</a>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <a href='#'>Quick & Easy Cooking</a>
                        </td>
                        <td>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <a href='#'>Vegetarian Cookery</a>
                        </td>
                        <td>
                            <a href='#'>More books >></a>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <a href='#'>Countries we ship to</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Delivery options</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Order cancellation and returns</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <a href='#'>Contact us</a>
                        </td>
                        <td rowspan='3' style='width: 125px;'>
                        </td>
                        <td rowspan='3'>
                            <img src='../../images/bookshop.png' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Jobs</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href='#'>Affiliates</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>`;
        return (
            <div>

                <JqxRibbon ref='myRibbon'
                    template={ribbonHTML}
                    width={450}
                    height={300}
                    position={'top'}
                    selectionMode={'click'}
                    animationType={'fade'}
                />

                <div style={{ marginTop: 30, fontWeight: 'bold' }}>Events:</div>
                <JqxPanel ref='log' style={{ borderWidth: 0 }}
                    width={250} height={200}
                />

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
