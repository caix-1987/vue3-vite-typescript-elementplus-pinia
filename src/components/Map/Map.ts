import markIcon from "@/assets/caix.png";
export const map = () => {
  const center = new TMap.LatLng(22.544903, 114.063063);
  return new TMap.Map(document.getElementById("caixMap"), {
    center: center, // 中心点坐标
    zoom: 17.2, // 地图缩放级别，支持3～20
    // pitch: 43.5, // 地图俯仰角度，取值范围为0~80，默认为0
    rotation: 0, // 地图在水平面上的旋转角度，顺时针方向为正，默认为0。
    viewMode: "2D",
    showControl: false, // 控件
    baseMap: {
      // 设置卫星地图
      // type: "satellite",
    },
  });
};

export const markerLayer = (myMap: any) => {
  return new TMap.MultiMarker({
    id: "caix_markerLayer",
    map: myMap,
    /*   styles: {
      default: new TMap.MarkerStyle({
        width: 25,
        height: 25,
        anchor: { x: 16, y: 32 },
        src: markIcon,
      }),
    }, */
  });
};

export const polylineLayer = (map: any, paths: any) => {
  return new TMap.MultiPolyline({
    id: "polyline-layer", //图层唯一标识
    map: map, //绘制到目标地图
    //折线样式定义
    styles: {
      style_blue: new TMap.PolylineStyle({
        color: "#3777FF", //线填充色
        width: 6, //折线宽度
        borderWidth: 5, //边线宽度
        borderColor: "#FFF", //边线颜色
        lineCap: "butt", //线端头方式
      }),
    },
    //折线数据定义
    geometries: [
      {
        //第1条线
        id: "pl_1", //折线唯一标识，删除时使用
        styleId: "style_blue", //绑定样式名
        paths: paths,
      },
    ],
  });
};

export const carMark = (myMap: any) => {
  return new TMap.MultiMarker({
    id: "caix_car",
    map: myMap,
    styles: {
      default: new TMap.MarkerStyle({
        width: 25,
        height: 25,
        anchor: { x: 16, y: 32 },
        src: markIcon,
      }),
      "car-down": new TMap.MarkerStyle({
        width: 48,
        height: 72,
        anchor: {
          x: 24,
          y: 36,
        },
        faceTo: "map",
        rotate: 270,
        src: "https://mapapi.qq.com/web/mapComponents/componentsTest/zyTest/static/model_taxi.png?a=1",
      }),
      start: new TMap.MarkerStyle({
        anchor: {
          x: 16,
          y: 32,
        },
        src: "https://mapapi.qq.com/web/miniprogram/demoCenter/images/marker-start.png",
      }),
      end: new TMap.MarkerStyle({
        src: "https://mapapi.qq.com/web/miniprogram/demoCenter/images/marker-end.png",
      }),
    },
    geometries: [
      {
        id: "car",
        position: new TMap.LatLng(22.544674487078687, 114.05843202914832),
        styleId: "car-down",
      },
      {
        id: "carStart",
        position: new TMap.LatLng(22.544674487078687, 114.05843202914832),
        styleId: "start",
      },
      /*  {
        id: "carStart",
        position: new TMap.LatLng(22.5448297034446, 114.06541583157878),
        styleId: 'car-down',
      }, */
      {
        id: "carEnd",
        position: new TMap.LatLng(22.546769893162356, 114.06538782185726),
        styleId: "end",
      },
    ],
  });
};

export const line = (myMap: any) => {
  return new TMap.MultiPolyline({
    id: "carLine", //图层唯一标识
    map: myMap, //绘制到目标地图
    //折线样式定义
    styles: {
      style_blue: new TMap.PolylineStyle({
        color: "#001428", //线填充色
        width: 26, //折线宽度
        borderWidth: 4, //边线宽度
        borderColor: "#e6a23c", //边线颜色
        lineCap: "butt", //线端头方式
      }),
    },
    //折线数据定义
    geometries: [
      {
        //第1条线
        id: "pl_1", //折线唯一标识，删除时使用
        styleId: "style_blue", //绑定样式名
        paths: [
          new TMap.LatLng(22.544674487078687, 114.05843202914832),
          new TMap.LatLng(22.5448297034446, 114.06541583157878),
          new TMap.LatLng(22.546769893162356, 114.06538782185726),
        ],
      },
    ],
  });
};
