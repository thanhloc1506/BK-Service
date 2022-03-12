import React, { useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";
import TimePicker from "../layouts/TimePicker";

const AddService: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl as any);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const imageChange = (e: any) => {
    if (!e.target.files || e.target.files.lenght === 0) {
      console.log(e.target.files[0]);
      setSelectedImage(undefined);
      return;
    }
    setSelectedImage(e.target.files[0]);
  };

  const removeImage = () => {
    setSelectedImage(undefined);
  };
  return (
    <div className="bg-gray-light h-fit">
      <div className="h-12 bg-white py-8 pb-20 pl-20 border-b-2 border-b-gray-200 shadow-sm">
        <p className="text-blue-400 font-medium text-3xl">Thêm dịch vụ</p>
      </div>
      <div className="px-10 pt-12 pb-16">
        <div className="grid grid-cols-5">
          <div className="mt-3">
            <p className="text-blue-400 font-medium text-2xl">Tên dịch vụ</p>
          </div>
          <div className="col-span-4">
            <div className="">
              <input
                type="text"
                className="outline-none w-3/4 h-12 p-5 border-2 border-gray-300 text-lg bg-slate-100"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 mt-8">
          <div className="mt-3">
            <p className="text-blue-400 font-medium text-2xl">Địa chỉ</p>
          </div>
          <div className="col-span-4">
            <div className="">
              <input
                type="text"
                className="outline-none w-3/4 h-12 p-5 border-2 border-gray-300 text-lg bg-slate-100"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8">
          <div className="col-span-2 mt-3">
            <p className="text-blue-400 font-medium text-2xl">Giờ hoạt động</p>
          </div>
          <div className="col-span-3 ml-12">
            <div className="">
              <TimePicker />
            </div>
          </div>
          <div className="col-span-2 mt-3 ml-20">
            <p className="text-blue-400 font-medium text-2xl">Đến</p>
          </div>
          <div className="col-span-3">
            <div className="ml-14">
              <TimePicker />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8">
          <div className="col-span-2 mt-3">
            <p className="text-blue-400 font-medium text-2xl">Tầm giá</p>
          </div>
          <div className="col-span-3 ml-12">
            <div className="">
              <div>
                <input
                  type="text"
                  className="bg-slate-100 border-2 border-slate-300 h-12 w-5/6 outline-none p-3 text-lg"
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 mt-3 ml-20">
            <p className="text-blue-400 font-medium text-2xl">Đến</p>
          </div>
          <div className="col-span-3">
            <div className="ml-14">
              <input
                type="text"
                className="bg-slate-100 border-2 border-slate-300 h-12 w-5/6 outline-none p-3 text-lg"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8">
          <div className="col-span-2">
            <p className="text-blue-400 font-medium text-2xl">Lĩnh vực</p>
          </div>
          <div className="col-span-3 ml-12">
            <div className="">
              <Dropdown items={["1", "2", "3"]} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-8">
          <div className="col-span-2">
            <p className="text-blue-400 font-medium text-2xl">Hình ảnh</p>
          </div>
          <div className="col-span-3 ml-12">
            <div>
              <div className="h-fit w-full bg-transparent">
                <input
                  type="file"
                  className="w-80 h-20"
                  id="image"
                  name="image"
                  onChange={imageChange}
                />
                {selectedImage && (
                  <div className="z-20">
                    <img
                      className="max-h-36 max-w-2xl z-30"
                      src={preview}
                      alt="thumb"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7"></div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <button className="bg-red-500 py-3 px-9 text-white">
                  Lam lai
                </button>
              </div>
              <div>
                <button className="bg-blue-solid py-3 px-3 text-white">
                  Them dich vu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
