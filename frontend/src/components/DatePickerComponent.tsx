import React from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

interface DatePickerComponentProps {
  onChange: (
    dates: [Dayjs, Dayjs] | null,
    dateStrings: [string, string]
  ) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onChange,
}) => {
  return (
    <DatePicker.RangePicker
      onChange={(dates, dateStrings) =>
        onChange(dates as [Dayjs, Dayjs] | null, dateStrings)
      }
      format="YYYY-MM-DD HH:mm"
      showTime
    />
  );
};

export default DatePickerComponent;
