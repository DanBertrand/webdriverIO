import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  title: string;
  data: number[];
};

const HighChart = ({ title, data }: Props) => {
  const options = {
    title: {
      text: title,
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChart;
