import React from 'react';
import ReactDOM from 'react-dom';

import JqxScheduler from '../../../jqwidgets-react/react_jqxscheduler.js';

class App extends React.Component {
    componentDidMount() {
        this.refs.myScheduler.focus();
    }
    render() {
        // prepare the data
        let source =
            {
                dataType: 'json',
                dataFields: [
                    { name: 'id', type: 'string' },
                    { name: 'status', type: 'string' },
                    { name: 'about', type: 'string' },
                    { name: 'address', type: 'string' },
                    { name: 'company', type: 'string' },
                    { name: 'name', type: 'string' },
                    { name: 'style', type: 'string' },
                    { name: 'calendar', type: 'string' },
                    { name: 'start', type: 'date', format: 'yyyy-MM-dd HH:mm' },
                    { name: 'end', type: 'date', format: 'yyyy-MM-dd HH:mm' }
                ],
                id: 'id',
                url: '../sampledata/appointments.txt'
            };
        let adapter = new $.jqx.dataAdapter(source);

        let appointmentDataFields =
            {
                from: 'start',
                to: 'end',
                id: 'id',
                description: 'about',
                location: 'address',
                subject: 'name',
                style: 'style',
                status: 'status'
            };

        let views =
            [
                'dayView',
                'weekView',
                'monthView'
            ];
        return (
            <div>

                <JqxScheduler ref='myScheduler'
                    date={new $.jqx.date(2016, 11, 23)}
                    width={850}
                    height={450}
                    source={adapter}
                    appointmentDataFields={appointmentDataFields}
                    view={'weekView'}
                    views={views}
                />
                <div style={{ fontFamily: 'Verdana', fontSize: 12, width: 670 }}>
                    <ul>
                        <li>
                            <b>Left Arrow</b> key is pressed - Selects the left cell, when the Scheduler is focused.
                            <ul>
                                <li>
                                    Navigates to previous view when <b>Ctrl</b> key is pressed and appointment is not selected.
                                </li>
                                <li>Selected appointment is moved left when <b>Ctrl</b> key is pressed.</li>
                                <li>Selected appointment is resized when <b>Shift</b> key is pressed and it is all day, timelineView or monthView appointment.</li>
                                <li>Selects left cell and updates the cells selection when <b>Shift</b> key is pressed.</li>
                            </ul>
                        </li>
                        <li>
                            <b>Right Arrow</b> key is pressed - Selects the right cell, when the Scheduler is focused.
                            <ul>
                                <li>
                                    Navigates to next view when <b>Ctrl</b> key is pressed and appointment is not selected.
                                </li>
                                <li>Selected appointment is moved right when <b>Ctrl</b> key is pressed.</li>
                                <li>Selected appointment is resized when <b>Shift</b> key is pressed and it is all day, timelineView or monthView appointment.</li>
                                <li>Selects right cell and updates the cells selection when <b>Shift</b> key is pressed.</li>
                            </ul>
                        </li>
                        <li>
                            <b>Up Arrow</b> key is pressed - Selects the cell above, when the Scheduler is focused.
                            <ul>
                                <li>Moves to cell selection to the first row when <b>Ctrl</b> key is pressed and cell is selected.</li>
                                <li>Selected appointment is moved above when <b>Ctrl</b> key is pressed.</li>
                                <li>Selected appointment is resized when <b>Shift</b> key is pressed and it is dayView or weekView appointment.</li>
                                <li>Selects the above cell and updates the cells selection when <b>Shift</b> key is pressed.</li>
                            </ul>
                        </li>
                        <li>
                            <b>Down Arrow</b> key is pressed - Selects the cell below, when the Scheduler is focused.
                            <ul>
                                <li>Moves to cell selection to the last row when <b>Ctrl</b> key is pressed and cell is selected.</li>
                                <li>Selected appointment is moved below when <b>Ctrl</b> key is pressed.</li>
                                <li>Selected appointment is resized when <b>Shift</b> key is pressed and it is dayView or weekView appointment.</li>
                                <li>Selects the below cell and updates the cells selection when <b>Shift</b> key is pressed.</li>
                            </ul>
                        </li>
                        <li><b>Enter</b> key is pressed - Opens the Edit Dialog.</li>
                        <li><b>Esc</b> key is pressed - Cancels dragging or resizing.</li>
                        <li>
                            <b>Tab</b> key is pressed - Tabs the selection to next appointment or out of Scheduler.
                        </li>
                        <li><b>Shift+Tab</b> keys are pressed - Tabs the selection to previous appointment or to focused cell.</li>
                        <li><b>Alt</b> key are pressed - When Alt and Number is pressed, the Scheduler toggles Appointments visibility by Resource.</li>
                        <li><b>Ctrl</b> key is pressed
                            <ul>
                                <li>Sets the View when <b>Number</b> key is pressed. For example Ctrl + 1, sets the view to the first view.</li>
                                <li>Opens the Context Menu when <b>m</b> key is pressed.</li>
                                <li>Opens the DateTimeInput in the Navigation Toolbar<b>d</b> key is pressed.</li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
