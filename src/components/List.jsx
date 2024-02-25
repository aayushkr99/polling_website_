import React, { useEffect, useState } from "react";
import "./List.css";
import { callApi, searchRedis } from "../utils/Api";
import Button from "./Button";
import Search from "./Search";
import { getAllActivity, getActivityById } from "../utils/Query";
const List = ({setData, data,setShowPoll, setState, setShowOptions}) => {
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    const graphqlQuery = getAllActivity();
    const response = await callApi(graphqlQuery);

    setData(response.data.data.activity);
  };
  useEffect(() => {
    fetchData()
  },[searchInput])

  const handleClick = async (id) => {
    try {
      const formattedId = `"${id}"`;
      const graphqlQuery = getActivityById(formattedId);
      const response = await callApi(graphqlQuery);

      if (response.data && response.data.data) {
        setShowOptions(true);
        const propObject = {};
        console.log(response.data.data);
        for (let key of response.data.data.activity_by_pk.options_activities) {
          propObject[key.name] = {
            ...key,
            label: key.name,
            vote: key.vote_counts[0].current_count,
            heading: response.data.data.activity_by_pk.heading,
          };
        }
        setState(propObject);
      } else {
        console.error("Invalid GraphQL response:", response.data);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  const handlePoll = async () => {
    setShowPoll(true);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchInput === "") {
      fetchData();
    } else {
      const redisdata = await searchRedis(searchInput);
      if (redisdata.status) {
        console.log(
          `data coming from redis -=-=-=-> ${redisdata.data}`,
          `data already present before search -=-=-=> ${data[0]}`
        );

        const val = redisdata.data.filter((x) => typeof x == "string");
        const final = val.map((x) => {
          const parts = x.split(":");
          const uuid = parts[1];
          return uuid;
        });

        console.log(final);
        const filteredArr = data.filter((obj) => final.includes(obj.id));
        setData(filteredArr);
      }
    }
  };

  return (
    <>
        <div style={{ backgroundColor: "#282c34", minHeight: "100vh" }}>
            <div className="list-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "60px",
                    lineHeight: "60px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  List of Activities
                </h2>
                <Search
                  onChange={(e) => setSearchInput(e.target.value)}
                  onClick={handleSearchSubmit}
                />
              </div>

              <Button onClick={handlePoll}>Add poll</Button>
              {data.map((obj) => {
                return (
                  <div
                    className="activity-item"
                    key={obj.id}
                    onClick={() => handleClick(obj.id)}
                  >
                    {obj.heading}
                  </div>
                );
              })}
            </div>
        </div>
    </>
  );
};

export default List;