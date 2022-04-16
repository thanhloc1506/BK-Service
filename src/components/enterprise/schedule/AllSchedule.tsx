import React, {useEffect} from "react";
import {ScheduleItem} from "./ScheduleItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchSchedule} from "../../../redux/slices/schedule";
import {RootState} from "../../../redux/store";

export const AllSchedules = ()=>{
    const dispatch = useDispatch();
    const scheduleState = useSelector((state: RootState)=>state.schedule);
    useEffect(()=>{
        dispatch(fetchSchedule());
    }, []);
    return (
        <div>
            <div className="bg-white p-8  border-b-2 border-b-gray-200 shadow-sm">
                <p className="text-blue-400 font-medium text-xl">
                    Tất cả lịch hẹn
                </p>
            </div>
            <div className={'flex flex-col gap-2 px-32 mt-10'}>
            {scheduleState.schedules.map((s, index)=>(
                    <ScheduleItem data={s} key={index}/>
            ))}
            </div>
            <div>
                {/*<ScheduleItem/>*/}
            </div>
        </div>
    )
}