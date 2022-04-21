import React, { useEffect, useState } from "react";
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
import service, {
  getAllSchedules,
  getComments,
  getFollowService,
  getServiceById,
  resetState,
  selectService,
} from "../redux/slices/service";
import { RootState } from "../redux/store";
import { hideWaiting, showWaiting } from "../redux/slices/loading";
import axiosClient from "../apis/axios";
import { PInScore } from "../apis/package/in/PInScore";
import { logout } from "../redux/slices/auth";
import cookies from "js-cookie";

const DetailService: React.FC = () => {
  const { serviceId } = useParams();
  const [score, setScore] = useState<number[]>([]);
  const dispatch = useDispatch();

  const userState = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (cookies.get("token") == undefined) {
      dispatch(logout());
    }
    dispatch(resetState());
    const fetchData = async () => {
      await dispatch(getServiceById(serviceId as string));
      if (userState.isAuthenticated) {
        await dispatch(getFollowService());
        await dispatch(getAllSchedules(serviceId as string));
      }
      await dispatch(getComments({ serviceId, userId: userState.user?._id }));
    };
    dispatch(selectService(serviceId as string));
    fetchData();
  }, [dispatch, userState.isAuthenticated]);

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
    <div className="min-h-screen h-fit pb-20">
      <Navbar />
      {serviceState.serviceLoading ? (
        ""
      ) : (
        <>
          <div className="pt-24">
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
              {serviceState.serviceLoading || serviceState.scheduleLoading ? (
                ""
              ) : (
                <Schedule
                  service={serviceState.singleService}
                  schedules={serviceState.schedules}
                />
              )}
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
