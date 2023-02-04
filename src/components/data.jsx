import React from "react";
import { List, Steps } from "antd";

const Data = ({ combinations }) => {
  const data = combinations;
  console.log(data);
  return (
    <div>
      <List
        size="large"
        header={<div>Fetched {data.length } train combinations</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Steps
              current={1}
              items={[
                {
                  title: item["firstTrain"]["from"],
                  description: item["firstTrain"]["num"] + " " + item["firstTrain"]["name"],
                },
                {
                  title: item["firstTrain"]["to"],
                  description: item["secondTrain"]["num"] + " " + item["secondTrain"]["name"],
                  subTitle: "Layover: " + item["layoverTime"],
                },
                {
                  title: item["secondTrain"]["to"],
                  subTitle: "Total Journey time: " + item["totalDuration"],
                },
              ]}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Data;
