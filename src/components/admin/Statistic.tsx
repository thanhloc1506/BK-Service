import React, {useEffect, useState} from 'react';
import {UserTable} from "./UserTable";

const NUM_COUNTING = 20;
export const StatisticCard = ({icon, label, number}: any) => {
    const [num, setNum] = useState(0);
    useEffect(() => {
        if (num < number) {
            setTimeout(() => {
                    setNum(pre => {
                        return Math.ceil(pre + number / NUM_COUNTING * Math.random());
                    });
                },
                20
            )
        } else {
            setNum(number);
        }
    }, [num]);
    return <>
        <div className={'px-8 py-4 flex bg-slate-50'}>
            <div className={'items-center justify-center'}>
                <div className={'w-16 h-16 self-center'}>{icon}</div>
                <div className={'flex items-center justify-center'}>{label}</div>
            </div>
            <div className={'w-0.5 h-15 bg-gray-100 mx-5'}/>
            <div className={'flex justify-center items-center'}>
                <h1 className={'text-2xl font-bold w-32'}>{num}</h1>
            </div>
        </div>
    </>
}

export const Statistic = () => {
    return (
        <div>
            <div className={'grid grid-cols-3 p-8'}>
                <div className={'mx-8'}>
                    <StatisticCard icon={<img src={require('../../assets/admin/users.png')}/>}
                                   label={'Customers'} number={'1000000'}/>
                </div>
                <div className={'mx-8'}>
                    <StatisticCard icon={<img src={require('../../assets/admin/office-building.png')}/>}
                                   label={'Enterprises'} number={'1000000'}/>
                </div>
                <div className={'mx-8'}>
                    <StatisticCard icon={<img src={require('../../assets/admin/money.png')}/>}
                                   label={'Total Earning'} number={'10000000'}/>
                </div>
            </div>

        </div>
    )
}