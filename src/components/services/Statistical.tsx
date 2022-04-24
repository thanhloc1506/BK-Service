import React from "react";

interface IStsistical {
  score: any;
  comments: any;
}

const Statistical: React.FC<IStsistical> = ({ comments, score }) => {
  return (
    <div className="mt-5">
      <div className="mx-24 bg-gray-100">
        <div className="flex justify-center py-5 border-b-2 border-b-gray-200">
          <p className="font-bold text-xl">{comments.length}</p>
          <p className="text-xl ml-2">Bình luận đã chia sẻ</p>
        </div>
        <div className="border-b-2 border-b-gray-200">
          <div className="grid grid-cols-5 py-5">
            <p className="flex justify-end col-span-2 text-purple-500 text-2xl">
              {comments.filter((comment: any) => comment.rating >= 9).length}
            </p>
            <p className="col-span-3 ml-5 text-2xl">Tuyệt vời</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-green-500 text-2xl">
              {
                comments.filter(
                  (comment: any) => comment.rating >= 7.5 && comment.rating < 9
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 text-2xl">Tốt</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-2xl">
              {
                comments.filter(
                  (comment: any) =>
                    comment.rating >= 4.5 && comment.rating < 7.5
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 text-2xl">Trung bình</p>
          </div>
          <div className="grid grid-cols-5 pb-5">
            <p className="flex justify-end col-span-2 text-red-500 text-2xl">
              {
                comments.filter(
                  (comment: any) => comment.rating >= 0 && comment.rating < 4.5
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 text-2xl">Kém</p>
          </div>
        </div>
        <div className="flex justify-center py-5">
          <p className="font-bold text-2xl text-purple-500">{score && score.length>=6 && score[5].toFixed(2)}</p>
          <p className="text-lg mt-1 ml-2">điểm</p>
          <p className="px-2 text-2xl">-</p>
          <p className="text-2xl">
            {score[5] >= 9
              ? "Tuyệt vời"
              : score[5] >= 7.5 && score[5] < 9
              ? "Tốt"
              : score[5] >= 4.5 && score[5] < 7.5
              ? "Trung bình"
              : "Kém"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
