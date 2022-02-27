import React, {createContext, useEffect, useState} from "react";
import {BiEdit} from "react-icons/bi";
import {FiMoreVertical} from "react-icons/fi";
import {Loading} from "./Loading";

const field = {
    field1: "Họ Và Tên",
    field2: "Tài khoản",
    field3: "Email",
    field4: "Role"
}
const fakeData = [{
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}, {
    name: "Long",
    account: "longhn2",
    email: "longhn2@gmail.com",
    role: "user"
}]

export interface IRowData {
    data: Object;
    isHeader?: boolean;
}

export interface ITableContext {
    numOfRow: number;
    numOfCol: number;
    data: Object[];
    fetchData?: (index: any) => void;
    widthCol?: number;
    curPage: number;
    totalPage: number;
}

export const TablePagingControl = ({numOfPage}: any) => {
    const TablePagingPieces = ({index}: any) => {
        return <TableContext.Consumer>
            {({fetchData, curPage}) => {
                return (
                    <button className={`border px-3 py-1 ${index == curPage?'bg-sky-100 text-sky-500':''}`} onClick={() => {
                        if (fetchData && Number.isInteger(index)) {
                            fetchData(index)
                        }
                    }}>
                        {index}
                    </button>
                )
            }
            }
        </TableContext.Consumer>
    }
    const getArrayIndex = (totalPage: number, curIndex: number) => {
        const offSet = Math.floor(curIndex / 10);
        const result = [];
        for (let i = offSet * 10; i < offSet * 10 + 11 && i <= totalPage; i++) {
            result.push(i);
        }
        console.log(result)
        return result;
    }
    return (<TableContext.Consumer>
        {({totalPage, curPage}) => <div className={'p-5 bg-slate-100 float-right'}>
            {
                getArrayIndex(totalPage, curPage).map((page)=>{
                return <TablePagingPieces index={page}/>
            })}
        </div>}
    </TableContext.Consumer>)

}

const TableContext = createContext<ITableContext>({
    numOfRow: fakeData.length,
    numOfCol: Object.keys(field).length,
    widthCol: 200,
    data: fakeData,
    fetchData: (index: any) => {
    },
    curPage: 1,
    totalPage: 100
});
export const TableRow = ({data, isHeader}: IRowData) => {
    return (
        <TableContext.Consumer>
            {({numOfRow, numOfCol, widthCol}) => {
                return <div>
                    <div className={`flex p-4 ${isHeader ? 'bg-blue-200' : 'bg-slate-100'}`}>
                        {[...Array(numOfCol)].map((value, index) => {
                            return <div style={{width: `${widthCol}px`}}>
                                <span
                                    className={`${isHeader ? 'font-semibold' : ''}`}>{data[Object.keys(data)[index] as keyof Object]}
                                </span>
                            </div>
                        })}
                        {
                            !isHeader && <div className={'flex'}>
                                <BiEdit className={'text-2xl text-gray-400 cursor-pointer'}/>
                                <FiMoreVertical className={'ml-5 text-2xl text-gray-400 cursor-pointer'}/>
                            </div>
                        }
                    </div>
                    <div className={'w-full h-0.5 bg-gray-300'}/>
                </div>
            }}
        </TableContext.Consumer>
    )
}

export const Table = () => {
    const fetchData = async (index: number) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTableInfo((state: ITableContext) => {
                return {
                    ...state,
                    numOfRow: fakeData.length,
                    numOfCol: Object.keys(field).length,
                    widthCol: 200,
                    data: fakeData,
                    curPage: index,
                }
            });
        }, 2000);
    }
    useEffect(() => {
        fetchData(1);
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [tableInfo, setTableInfo] = useState<ITableContext>({
        numOfCol: 4,
        numOfRow: 0,
        widthCol: 200,
        data: [],
        fetchData,
        curPage: 1,
        totalPage: 20
    })
    if (isLoading) {
        return <Loading show={isLoading}/>
    }
    return (
        <TableContext.Provider value={tableInfo}>
            <div className={'inline-block'}>
                <TableRow data={field} isHeader/>
                {tableInfo.data.map((e: any, index: any) => {
                    return <TableRow data={e} key={index}/>
                })}
                <div className={'bg-slate-100'}>
                    <TablePagingControl numOfPage={10}/>
                </div>
            </div>
        </TableContext.Provider>
    )
}