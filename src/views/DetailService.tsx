import React from "react";
import Navbar from "../components/layouts/Navbar";
import Description from "../components/services/Description";
import HeaderDeatail from "../components/services/HeaderDeatail";
import Menu from "../components/services/Menu";
import Post from "../components/services/post/Post";
import Schedule from "../components/services/Schedule";
import Statistical from "../components/services/Statistical";

const DetailService: React.FC = () => {
  const description =
    "The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on";
  const actions = [
    { name: "Thay mat kinh", price: 500000 },
    { name: "Thay man hinh", price: 5000000 },
  ];
  const posts = [
    {
      avatar: "",
      fullName: "Tran Van C",
      time: "30/11/2021",
      like: [""],
      rating: 9.2,
      content:
        "The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for i",
      serviceName: ["Nguyen Van A", "Sua chua dien thoai"],
    },
    {
      avatar: "",
      fullName: "Tran Van C",
      time: "30/11/2021",
      like: [""],
      rating: 9.2,
      content:
        "The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for i",
      serviceName: ["Nguyen Van A", "Sua chua dien thoai"],
    },
  ];
  return (
    <div className="min-h-screen h-fit pb-20">
      <div className="fixed w-screen z-10">
        <Navbar />
      </div>
      <div className="pt-24">
        <HeaderDeatail />
      </div>
      <div className="grid grid-cols-3 border-gray-100 border-b-2 pb-5">
        <div className="col-span-2">
          <Description description={description} />
          <div className="mt-7">
            <Menu actions={actions} />
          </div>
        </div>
        <div className="overflow-hidden max-w-screen">
          <Schedule />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3">
          <div className="col-span-2 mt-5">
            <div className="ml-10">
              {posts.map((post, index) => (
                <div className="mb-20" key={index}>
                  <Post
                    avatar={post.avatar}
                    content={post.content}
                    fullName={post.fullName}
                    like={post.like}
                    rating={post.rating}
                    serviceName={post.serviceName}
                    time={post.time}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Statistical />
            <div className="mx-24 mt-4">
              <button className="bg-blue-500 w-full py-3 rounded-md text-white text-xl">
                Viet binh luan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailService;