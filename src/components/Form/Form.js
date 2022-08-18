import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Card from "components/UI/Card";

const Form = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const eventNameRef = useRef();

  useEffect(() => {
    const defaultEndday = new Date();
    defaultEndday.setDate(defaultEndday.getDate() + 7);
    setEndDate(defaultEndday);
  }, []);

  const submitHandler = (e) => {
    alert("제출됨");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="bg-slate-600 rounded-md p-8 mb-8">
        <div className="pb-6">
          <h2 className="font-bold text-xl p-1">이벤트 제목 </h2>
          <input
            className="w-full rounded-sm px-2 py-1.5 text-sm"
            type="text"
            placeholder="이벤트 제목을 입력해주세요."
          />
        </div>

        <div>
          <h3 className="font-bold p-1">이벤트 설명 </h3>
          <textarea
            className="w-full rounded-sm px-2 py-1.5 text-sm"
            type="text"
            placeholder="이벤트 설명을 입력해주세요."
            ref={eventNameRef}
          />
        </div>
      </div>

      <div className="bg-slate-600 rounded-md p-8 mb-8">
        <h3 className="font-bold p-1">이벤트 기간</h3>
        <div className="flex p-2 text-sm">
          <div>
            <p className="pb-1">이벤트 시작일</p>
            <div>
              <DatePicker
                className="w-full rounded-sm px-2 py-1.5"
                selectsStart
                selected={startDate}
                endDate={endDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="pl-16">
            <p className="pb-1">이벤트 종료일</p>
            <DatePicker
              className="w-full rounded-sm px-2 py-1.5"
              selectsEnd
              selected={endDate}
              minDate={startDate}
              endDate={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
      </div>
      <div className="bg-slate-600 mb-8 rounded-md p-4 cursor-pointer">
        + 항목 추가
      </div>
    </form>
  );
};

export default Form;
