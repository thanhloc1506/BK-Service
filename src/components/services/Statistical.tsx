import React from "react";

interface IStsistical {
  score: any;
  comments: any;
  rankingScore: any;
}

const Statistical: React.FC<IStsistical> = ({
  comments,
  score,
  rankingScore,
}) => {
  return (
    <div className="mt-5">
      <div className="bg-white w-[22vw] border-2 boder-gray-100">
        <div className="flex justify-center 2xl:py-5 xl:py-4 lg:py-3 border-b-2 border-b-gray-200">
          <p className="font-bold 2xl:text-xl xl:text-lg lg:text-sm">
            {comments.length}
          </p>
          <p className="2xl:text-xl xl:text-lg lg:text-sm font-light ml-2">
            Bình luận đã chia sẻ
          </p>
        </div>
        <div className="border-b-2 border-b-gray-200">
          <div className="grid grid-cols-5 2xl:py-5 xl:py-4 lg:py-3">
            <p className="flex justify-end col-span-2 text-blue-solid 2xl:text-xl xl:text-lg lg:text-sm">
              {comments.filter((comment: any) => comment.rating >= 9).length}
            </p>
            <p className="col-span-3 ml-5 2xl:text-xl xl:text-lg lg:text-sm">
              Tuyệt vời
            </p>
          </div>
          <div className="grid grid-cols-5 2xl:pb-5 xl:pb-4 lg:pb-3">
            <p className="flex justify-end col-span-2 text-green-500 2xl:text-xl xl:text-lg lg:text-sm">
              {
                comments.filter(
                  (comment: any) => comment.rating >= 7.5 && comment.rating < 9
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 2xl:text-xl xl:text-lg lg:text-sm">
              Tốt
            </p>
          </div>
          <div className="grid grid-cols-5 2xl:pb-5 xl:pb-4 lg:pb-3">
            <p className="flex justify-end col-span-2 2xl:text-xl xl:text-lg lg:text-sm">
              {
                comments.filter(
                  (comment: any) =>
                    comment.rating >= 4.5 && comment.rating < 7.5
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 2xl:text-xl xl:text-lg lg:text-sm">
              Bình thường
            </p>
          </div>
          <div className="grid grid-cols-5 2xl:pb-5 xl:pb-4 lg:pb-3">
            <p className="flex justify-end col-span-2 text-red-500 2xl:text-xl xl:text-lg lg:text-sm">
              {
                comments.filter(
                  (comment: any) => comment.rating >= 0 && comment.rating < 4.5
                ).length
              }
            </p>
            <p className="col-span-3 ml-5 2xl:text-xl xl:text-lg lg:text-sm">
              Kém
            </p>
          </div>
        </div>
        <div className="flex justify-center 2xl:py-5 xl:py-4 lg:py-3">
          <p className="font-bold 2xl:text-xl xl:text-lg lg:text-sm text-blue-solid">
            {rankingScore ?? "7.0"}
          </p>
          <p className="2xl:text-lg xl:text:sm lg:text-sm 2xl:mt-[0.1rem] xl:mt-1 ml-2">
            điểm
          </p>
          <p className="px-2 2xl:text-xl xl:text-lg lg:text-sm">-</p>
          <p className="2xl:text-xl xl:text-lg lg:text-sm">
            {score[5] >= 9
              ? "Tuyệt vời"
              : score[5] >= 7.5 && score[5] < 9
              ? "Tốt"
              : score[5] >= 4.5 && score[5] < 7.5
              ? "Bình thường"
              : "Kém"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
