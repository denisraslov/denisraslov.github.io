import React, { useState } from 'react';
import { Grid, Input, Select } from 'react-spreadsheet-grid';
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

const GridWrapper = () => {
    const [rows, setRows] = useState(usersData.results);

    const onFieldChange = (rowKey, field) => (value) => {
        const modifiedRows = [].concat(rows);
        const row = modifiedRows.find((row) => {
            return getRowKey(row) === rowKey;
        });

        set(row, field, value);
        setRows(modifiedRows)
    }

    const initColumns = () => {
        return [
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
                width: 6,
                getCellClassName: () => "Grid__photoCell"
            },
            {
                title: 'First name',
                value: (row, {focus}) => {
                    return (
                        <Input
                            value={row.name.first}
                            focus={focus}
                            onChange={onFieldChange(getRowKey(row), 'name.first')}
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
                            onChange={onFieldChange(getRowKey(row), 'name.last')}
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
                            onChange={onFieldChange(getRowKey(row), 'login.username')}
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
                            onChange={onFieldChange(getRowKey(row), 'positionId')}
                        />
                    );
                },
                id: 'position',
                width: 15,
            },
            {
                title: 'Registered',
                value: (row, {focus}) => {
                    return (
                        <Input
                            value={row.registered.split(' ')[0]}
                            focus={focus}
                            onChange={onFieldChange(getRowKey(row), 'registered')}
                        />
                    );
                },
                id: 'registered',
                width: 9,
            },
            {
                title: 'Contract',
                value: (row, {focus}) => {
                    return (
                        <Select
                            items={contractTypes}
                            selectedId={row.contractTypeId}
                            isOpen={focus}
                            onChange={onFieldChange(getRowKey(row), 'contractTypeId')}
                        />
                    );
                },
                id: 'contract',
                width: 10,
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
                            onChange={onFieldChange(getRowKey(row), 'location.street')}
                        />
                    );
                },
                id: 'location',
                width: 25
            }
        ];
    }

    const [columns, setColumns] = useState(initColumns())

    const onColumnResize = (widthValues) => {
        const newColumns = [].concat(columns)
        Object.keys(widthValues).forEach((columnId) => {
            const column = columns.find(({ id }) => id === columnId);
            column.width = widthValues[columnId]
        })
        setColumns(newColumns)
    }

    return (
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
                columns={columns}
                rows={rows}
                getRowKey={row => getRowKey(row)}
                rowHeight={60}
                disabledCellChecker={(row, columnId) => {
                    return columnId === 'photo' ||
                        columnId === 'location' ||
                        columnId === 'registered';
                }}
                isColumnsResizable
                onColumnResize={onColumnResize}
            />
        </div>
    );
}

export default GridWrapper;