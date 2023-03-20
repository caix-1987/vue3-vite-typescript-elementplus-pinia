import { MockMethod } from "vite-plugin-mock";

const mock: Array<MockMethod> = [
  {
    url: "/api/v1/table",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        "data|20": [
          {
            "id|+1": "0",
            username: "@cname",
            createTime: "@date(yyyy-MM-DD)",
            email: "@email()",
            "phone|1": ["1398779792", "13987737892", "15008885522"],
            "roles|1": ["admin", "guest"],
            status: Boolean,
          },
        ],
      };
    },
  },
];

export default mock;
