import {Address} from "../apis/common/Address";
import axios from "axios";
import {ADDRESS_API_URL} from "../constants/common";

export const getAddressContent = async (data: Address | undefined) => {
    try {
        if (!data) return "";
        const res = await axios.get(
            ADDRESS_API_URL + "/province/district/" + data.province
        );
        const quanList = res.data.results;
        let quan = undefined;
        for (let i = 0; i < quanList.length; ++i) {
            if (quanList[i].district_id == data.district) {
                quan = quanList[i];
                break;
            }
        }
        if (!quan) return;

        const resPhuong = await axios.get(
            ADDRESS_API_URL + "/province/ward/" + quan.district_id
        );
        const phuongList = resPhuong.data.results;
        let phuong = undefined;
        for (let i = 0; i < phuongList.length; ++i) {
            if (phuongList[i].ward_id == data.village) {
                phuong = phuongList[i];
                break;
            }
        }
        if (!phuong) return;
        if (data.detail) {
            return `${data.detail}, ${phuong.ward_name}, ${quan.district_name}`;
        }
        return `${phuong.ward_name}, ${quan.district_name}`;
    } catch (e) {
        return "";
    }
};