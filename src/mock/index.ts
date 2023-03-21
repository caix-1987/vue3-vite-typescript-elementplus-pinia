import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const mock: Array<MockMethod> = [
  {
    url: "/api/v1/table",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        message: "ok",
        "list|10": [
          {
            id: "@id",
            username: "@cname",
            createTime: "@date(yyyy-MM-dd)",
            email: "@email()",
            phone: /13\d{9}/,
            "roles|1": ["admin", "guest"],
            "status|1": ["男", "女"],
          },
        ],
        total: 100,
      };
    },
  },
];

export const mockTableItem = async (username: string, phone: string) => {
  const result = await Mock.mock({
    data: [
      {
        id: "@id",
        username: username,
        createTime: "@date(yyyy-MM-dd)",
        email: "@email()",
        phone: phone,
        roles: "admin",
        status: "男",
      },
    ],
  });
  return result;
};

export default mock;
