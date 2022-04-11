import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Description from "../components/services/Description";
import HeaderDeatail from "../components/services/HeaderDeatail";
import Menu from "../components/services/Menu";
import CommentModal from "../components/services/post/CommentModal";
import Post from "../components/services/post/Post";
import Schedule from "../components/services/Schedule";
import BookServiceModal from "../components/services/schedule/BookServiceModal";
import Statistical from "../components/services/Statistical";
import {
  getComments,
  getFollowService,
  getServiceById,
  selectService,
} from "../redux/slices/service";
import { RootState } from "../redux/store";

const DetailService: React.FC = () => {
  const { serviceId } = useParams();

  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.user?._id);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getServiceById(serviceId as string));
      await dispatch(getFollowService());
      await dispatch(getComments({ serviceId, userId }));
    };
    dispatch(selectService(serviceId as string));
    fetchData();
  }, [dispatch]);

  const serviceState = useSelector((state: RootState) => state.service);

  const description =
    serviceState.singleService?.description ||
    "The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on";
  const actions = serviceState.singleService?.action || [
    { name: "Thay mat kinh", price: 500000 },
    { name: "Thay man hinh", price: 5000000 },
  ];
  const post = {
    avatar: "",
    fullName: "Tran Van C",
    time: "30/11/2021",
    like: [""],
    rating: 9.2,
    content:
      "The Receipe for its Success Lies in Xd’s Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for its Success Lies in Xds Long-term-focused Strategy on The Receipe for i",
    serviceName: ["Nguyen Van A", "Sua chua dien thoai"],
  };

  return (
    <div className="min-h-screen h-fit pb-20">
      <Navbar />
      {serviceState.serviceLoading ? (
        ""
      ) : (
        <>
          <div className="pt-24">
            <HeaderDeatail
              name={serviceState.singleService.name}
              phone={serviceState.singleService.phone}
              address={serviceState.singleService.address}
              serviceId={serviceId as string}
              followServices={serviceState.followService}
            />
          </div>
          <div className="grid grid-cols-3 border-gray-200 border-b-2 pb-5">
            <div className="col-span-2">
              <Description description={description} />
              <div className="mt-12">
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
                  {serviceState.commentLoading
                    ? ""
                    : serviceState.comments.map(
                        (comment: any, index: number) => (
                          <div className="mb-20" key={index}>
                            <Post
                              avatar={comment.user.username}
                              content={comment.content}
                              fullName={comment.user.username}
                              like={comment.userLiked}
                              rating={comment.rating}
                              serviceName={serviceState.singleService.name}
                              time={comment.time}
                              title={comment.title}
                              images={comment.images}
                            />
                          </div>
                        )
                      )}
                </div>
              </div>
              <div>
                <Statistical />
                <div className="mx-24 mt-4">
                  <CommentModal />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailService;
