"use client"

import { useQuery } from "@tanstack/react-query"
// import Button from "@/components/ui/Button"
import React, { useState } from "react"
import { getTechs } from "../../projects/api"
import SelectStackButton from "./SelectStackButton"
import { Tables } from "@/types/supabase"

interface Props {
  categoryData: TCategoryData
  setCategoryData: React.Dispatch<React.SetStateAction<TCategoryData>>
  isWritePage: boolean
}
{
  /* TODO 1: child 모두에 같은 스타일링 하는 법 있음 !.... */
}
const Category = ({ categoryData, setCategoryData, isWritePage }: Props) => {
  const {
    startDate,
    endDate,
    isOffline,
    region,
    numberOfMembers,
    techs,
    positions,
  } = categoryData

  const { data: allTechs } = useQuery({
    queryKey: ["allTechs"],
    queryFn: getTechs,
  })

  return (
    <section className="flex flex-col gap-3 pb-[25px]">
      {!isWritePage && <h3 className="text-[26px] font-[700]">필터링 검색</h3>}
      <div className="flex justify-around relativepy-8 border-y-[1.5px] border-slate-800">
        <div>
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">프로젝트 방식</h5>
            <ul className="flex gap-[8px] items-center">
              <li
                onClick={() =>
                  setCategoryData({ ...categoryData, isOffline: true })
                }
                className={`category ${
                  isOffline ? "border-red-600" : "border-slate-400"
                }`}
              >
                오프라인
              </li>
              <li
                onClick={() =>
                  setCategoryData({ ...categoryData, isOffline: false })
                }
                className={` category ${
                  !isOffline ? "border-red-600" : "border-slate-400"
                }`}
              >
                온라인
              </li>
            </ul>
          </div>
          {isOffline && (
            <div className="flex flex-col gap-[16px] py-[15px]">
              <h5 className="text-[20px] font-[600]">활동 지역</h5>
              <select
                defaultValue="1"
                className={`border-[1.5px]  ${
                  region === "1" || region === ""
                    ? "border-slate-400"
                    : "border-red-500"
                }  px-[20px] py-[5px] rounded-full`}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, region: e.target.value })
                }
              >
                {/* TODO 2 : 옵션 스타일링... 왜안돼!!! -> li로 바꿔야하나, value가 1,2,3,4로 처리해도 될까 */}
                <option value="1">지역을 선택하세요</option>
                <option value="2">서울/경기/인천</option>
                <option value="3">강원도</option>
                <option value="4">경상도</option>
                <option value="5">전라도</option>
                <option value="6">충청도</option>
                <option value="7">제주도</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">프로젝트 기간</h5>
          <ul className="flex flex-col gap-[8px] items-center">
            <li className="flex items-center gap-[5px]">
              <label>시작일:</label>
              {/* TODO 3 : 유효성검사 - 날짜 오늘날짜 이후,종료일은 시작날짜 이후로만 선택되게하기  */}
              <input
                className="border-[1.5px] border-slate-800 px-[20px] py-[5px] rounded-full "
                type="date"
                name="project_start_date"
                value={startDate}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    startDate: e.target.value,
                  })
                }
              />
            </li>
            <li className="flex items-center gap-[5px]">
              <label>종료일:</label>
              <input
                className="border-[1.5px] border-slate-800 px-[20px] py-[5px] rounded-full "
                type="date"
                name="project_end_date"
                value={endDate}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, endDate: e.target.value })
                }
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[16px] py-[15px]">
          <h5 className="text-[20px] font-[600]">기술 스택</h5>
          <ul className="flex gap-3 items-center">
            <SelectStackButton
              allTechs={allTechs as Tables<"techs">[][]}
              categoryData={categoryData}
              setCategoryData={setCategoryData}
            />
          </ul>
        </div>
        {/* 글쓰기page vs 메인page */}
        {isWritePage ? (
          <div className="flex flex-col gap-[16px] py-[15px]">
            <h5 className="text-[20px] font-[600]">인원 수</h5>
            <div className="gap-[8px]">
              <input
                className="w-[70px] rounded-md"
                type="number"
                value={numberOfMembers}
                min={0}
                onChange={(e) =>
                  setCategoryData({
                    ...categoryData,
                    numberOfMembers: Number(e.target.value),
                  })
                }
              />
              <span>명</span>
            </div>
          </div>
        ) : (
          <button className="mt-auto bg-black text-white text-[16px] py-[12px] px-[34px] rounded-full">
            검색
          </button>
        )}
      </div>
    </section>
  )
}

export default Category
