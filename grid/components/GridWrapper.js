import React from 'react';
import { Grid, Input, Select } from './Grid';
import set from 'lodash.set';
import usersData from './../users.json';

const positions = [{
    id: 1,
    name: 'System Architect'
},{
    id: 2,
    name: 'Frontend Developer'
}, {
    id: 3,
    name: 'Backend Developer'
}, {
    id: 4,
    name: 'Big Data Developer'
}, {
    id: 5,
    name: 'Computer Operator'
}, {
    id: 6,
    name: 'Manager'
}, {
    id: 7,
    name: 'Content Manager'
}, {
    id: 8,
    name: 'Support manager'
}];

const contractTypes = [{
    id: 1,
    name: 'Full-time'
},{
    id: 2,
    name: 'Part-time'
}, {
    id: 3,
    name: 'Freelance'
}];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < usersData.results.length; i++) {
    usersData.results[i].positionId = getRandomNumber(1, 8);
    usersData.results[i].contractTypeId = getRandomNumber(1, 3);
}

function getRowKey(row) {
    return row.login.sha1;
}

class GridWrapper extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            rows: usersData.results
        };
    }

    onFieldChange(rowKey, field, value) {
        const modifiedRows = [].concat(this.state.rows);
        const row = modifiedRows.find((row) => {
            return getRowKey(row) === rowKey;
        });

        set(row, field, value);

        this.setState({
            rows: modifiedRows,
            blurCurrentFocus: true
        });
    }

    render() {
        return [
            <div
                key="info"
                className="Info"
            >
                <div>
                    <div className="Info__Name">React Spreadsheet Grid</div>
                    <div className="Info__Description">
                        Excel-like grid component for React with custom cell editors, performant scroll & resizable columns
                    </div>
                </div>
                <a href="https://github.com/denisraslov/react-spreadsheet-table" className="Info__Button">
                    VIEW DOCS ON GITHUB
                </a>
            </div>,
            <div
                key="grid"
                className="GridWrapper"
            >
                <a
                    href="https://gist.github.com/denisraslov/d65bc39514e99580b39cd99e9977caf8"
                    target="_blank"
                    className="ExampleCodeButton"
                >
                    Open source code
                </a>
                <Grid
                    columns={[
                        {
                            title: 'Photo',
                            value: (row, {focus}) => {
                                return (
                                    <img
                                        src={row.picture.thumbnail}
                                    />
                                );
                            },
                            id: 'photo',
                            getCellClassName: () => "Grid__photoCell"
                        },
                        {
                            title: 'First name',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.name.first}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, getRowKey(row), 'name.first')}
                                    />
                                );
                            },
                            id: 'name.first'
                        },
                        {
                            title: 'Last name',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.name.last}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, getRowKey(row), 'name.last')}
                                    />
                                );
                            },
                            id: 'name.last'
                        },
                        {
                            title: 'Username',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.login.username}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, getRowKey(row), 'login.username')}
                                    />
                                );
                            },
                            id: 'login.username'
                        },
                        {
                            title: 'Position',
                            value: (row, {focus}) => {
                                return (
                                    <Select
                                        items={positions}
                                        selectedId={row.positionId}
                                        isOpen={focus}
                                        onChange={this.onFieldChange.bind(this, getRowKey(row), 'positionId')}
                                    />
                                );
                            },
                            id: 'position'
                        },
                        {
                            title: 'Registered',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.registered.split(' ')[0]}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, getRowKey(row), 'registered')}
                                    />
                                );
                            },
                            id: 'registered'
                        },
                        {
                            title: 'Contract',
                            value: (row, {focus}) => {
                                return (
                                    <Select
                                        items={contractTypes}
                                        selectedId={row.contractTypeId}
                                        isOpen={focus}
                                        onChange={this.onFieldChange.bind(this, getRowKey(row), 'contractTypeId')}
                                    />
                                );
                            },
                            id: 'contract'
                        },
                        {
                            title: 'Location',
                            value: (row, {focus}) => {
                                return (
                                    <Input
                                        value={row.location.postcode + ', ' +
                                            row.location.city + ', ' +
                                            row.location.state + ', ' +
                                            row.location.street}
                                        focus={focus}
                                        onBlur={this.onFieldChange.bind(this, getRowKey(row), 'location.street')}
                                    />
                                );
                            },
                            id: 'location'
                        }
                    ]}
                    rows={this.state.rows}
                    blurCurrentFocus={this.state.blurCurrentFocus}
                    getRowKey={row => getRowKey(row)}
                    rowHeight={60}
                    disabledCellChecker={(row, columnId) => {
                        return columnId === 'photo' ||
                            columnId === 'location' ||
                            columnId === 'registered';
                    }}
                    isColumnsResizable
                    columnWidthValues={{
                        photo: 6,
                        position: 15,
                        registered: 9,
                        contract: 10,
                        location: 25
                    }}
                />
            </div>
        ];
    }
}

export default GridWrapper;