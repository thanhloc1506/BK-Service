import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Description from "../components/services/Description";
import HeaderDeatail from "../components/services/HeaderDeatail";
import Post from "../components/services/post/Post";
import Statistical from "../components/services/Statistical";
import {
  getComments,
  getServiceById,
  selectService,
} from "../redux/slices/service";
import { RootState } from "../redux/store";
import { hideWaiting, showWaiting } from "../redux/slices/loading";
import axiosClient from "../apis/axios";
import { PInScore } from "../apis/package/in/PInScore";

const DetailService: React.FC = () => {
  const { serviceId } = useParams();
  const [score, setScore] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!serviceState.singleService?._id) return;
    const fetchData = async () => {
      await dispatch(getServiceById(serviceId as string));
      await dispatch(getComments({ serviceId }));
    };
    dispatch(selectService(serviceId as string));
    fetchData();
  }, [dispatch, serviceId]);

  const serviceState = useSelector((state: RootState) => state.service);

  useEffect(() => {
    //fethc score
    if (!serviceState.singleService?._id) return;
    dispatch(showWaiting());
    axiosClient
      .get<PInScore>(`service/${serviceState.singleService?._id}/scores`)
      .then((response) => setScore(response.data.score))
      .finally(() => dispatch(hideWaiting()));
  }, [serviceState.singleService]);
  return (
    <div className="min-h-screen h-fit pb-20 bg-[#f7f8fa]">
      <Navbar />
      {serviceState.serviceLoading ? (
        ""
      ) : (
        <div className="px-[12%]">
          <div className="pt-28">
            {serviceState.singleService && (
              <HeaderDeatail
                data={serviceState.singleService}
                scores={score}
                numOfComments={serviceState.comments.length}
              />
            )}
          </div>
          <div className="grid grid-cols-3 border-gray-200 border-b-2 pb-5">
            <div className="col-span-2">
              <Description
                description={
                  serviceState.singleService?.introduction !== ""
                    ? (serviceState.singleService?.introduction as string)
                    : "Chưa có mô tả"
                }
              />
            </div>
            <div className="overflow-hidden max-w-screen">
              {/*<Schedule />*/}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3">
              <div className="col-span-2 mt-5">
                <div className="">
                  {serviceState.commentLoading
                    ? ""
                    : serviceState.comments.map(
                        (comment: any, index: number) => (
                          <div className="mb-20" key={index}>
                            <Post
                              avatar={
                                comment.user?.avatar?.url
                                  ? comment.user?.avatar?.url
                                  : null
                              }
                              content={comment.content}
                              fullName={
                                comment.user.fullName
                                  ? comment.user.fullName
                                  : comment.user.username
                              }
                              like={comment.userLiked}
                              rating={comment.rating}
                              serviceName={serviceState.singleService?.name}
                              time={comment.time}
                              title={comment.title}
                              images={comment.images}
                              id={comment._id}
                              numOfUserLiked={comment.numOfUserLiked}
                            />
                          </div>
                        )
                      )}
                </div>
              </div>
              <div>
                <div className="flex justify-end">
                  <Statistical score={score} comments={serviceState.comments} />
                </div>
                {/*<div className="mx-24 mt-4">*/}
                {/*    <CommentModal />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailService;
