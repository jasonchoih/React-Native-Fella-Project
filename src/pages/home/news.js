import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { DataTable } from 'react-native-paper';
// 
import styles from 'config/styles';
// 
export default () =>
{
    const header = [
        'Name',
        'Email',
        'Age'
    ]
    const data = [
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
       ['John', 'john@kindacode.com', 33],
    ];
    // 
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);
    // 
    return <View>
        <DataTable>
            <DataTable.Header>
                {header.map((v,k)=>(
                    <DataTable.Title key={k}>
                        {v}
                    </DataTable.Title>
                ))}
            </DataTable.Header>
            
            {data.map((v,k)=>(
                <DataTable.Row key={k}>
                    {v.map((vv,kk)=>(
                        <DataTable.Cell key={kk}>
                            {vv}
                        </DataTable.Cell>
                    ))}
                </DataTable.Row>
            ))}
            
            {/* <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${data.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={'Rows per page'}
            /> */}
        </DataTable>
    </View>
}