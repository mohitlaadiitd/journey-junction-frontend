import React from "react";
import { Form, DatePicker, TimePicker, Button, Row, Col, Spin, Empty } from "antd";
import { Select } from "antd";
import stations from "./stations.json";
import axios from "axios";
import Data from "./data.jsx";

const config = {
  rules: [{ required: false, message: "Please select this field!" }],
};

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      source: null,
      destination: null,
      combinations: null,
      loading: false,
    };
    this.fetchCombinations = this.fetchCombinations.bind(this);
  }

  fetchCombinations(e) {
    let year = this.state.date["$y"];
    let month = this.state.date["$M"] + 1;
    let day = this.state.date["$D"];
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let date = year + month + day;
    console.log(this.state);
    // create body for post request
    let body = {
      date: date,
      source: this.state.source,
      destination: this.state.destination,
    };
    this.setState({ loading: true, combinations: null });
    axios
      .post(
        `http://localhost:3000/api`, body
      )
      .then((res) => {
        this.setState({ combinations: res.data['combinations'] });
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <Form name="time_related_controls" onFinish={this.fetchCombinations}>
          <Row gutter={3}>
            <Col flex={3}>
              <Form.Item name="date-picker" label="DatePicker" {...config}>
                <DatePicker
                  style={{ width: "200px" }}
                  onChange={(value) => {
                    this.setState({ date: value });
                  }}
                />
              </Form.Item>
            </Col>
            <Col flex={3}>
              <Form.Item name="source" label="Source" {...config}>
                <Select
                  showSearch
                  placeholder="Select a source"
                  style={{ width: "200px" }}
                  onChange={(value) => {
                    this.setState({ source: value });
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={stations["stations"]}
                ></Select>
              </Form.Item>
            </Col>
            <Col flex={3}>
              <Form.Item name="destination" label="Destination" {...config}>
                <Select
                  showSearch
                  placeholder="Select a destination"
                  optionFilterProp="children"
                  style={{ width: "200px" }}
                  onChange={(value) => {
                    this.setState({ destination: value });
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={stations["stations"]}
                  {...config}
                ></Select>
              </Form.Item>
            </Col>
            <Col flex={3}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "200px" }}
              >
                Search Train Combinations
              </Button>
            </Col>
          </Row>
        </Form>
        {this.state.loading && <Spin size="large"></Spin>}
        {this.state.loading != true && this.state.combinations == null && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {this.state.combinations && <Data combinations={this.state.combinations}></Data>}
      </div>
    );
  }
}

export default Submit;
