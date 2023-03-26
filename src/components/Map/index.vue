<script lang="ts" setup>
import { onMounted, ref, onUnmounted, nextTick, watch } from "vue";
import { map, markerLayer, polylineLayer, carMark, line } from "./Map";
import { type ThemeName, useTheme } from "@/hooks/setTheme";
import { set } from "lodash-es";
let myMap!: any;
let MyMarkerLayer!: any;
let MyPolylineLayer!: any;
let MyCarMark!: any;
let MyLine!: any;
const path: [] = [
  new TMap.LatLng(22.544674487078687, 114.05843202914832),
  new TMap.LatLng(22.5448297034446, 114.06541583157878),
  new TMap.LatLng(22.546769893162356, 114.06538782185726),
];
const lng = ref<number | string>();
const lat = ref<number | string>();
const { activeThemeName } = useTheme();
const setMapTheme = (name: string) => {
  switch (name) {
    case "normal":
      myMap.setMapStyleId("style1");
      break;
    case "dark-blue":
      myMap.setMapStyleId("style2");
      break;
    case "dark":
      myMap.setMapStyleId("style3");
      break;
    default:
      myMap.setMapStyleId("style1");
  }
};

watch(
  activeThemeName,
  (name) => {
    setMapTheme(name);
  },
  {
    deep: true,
  }
);
const resetMark = () => {
  lng.value = "";
  lat.value = "";
  if (MyMarkerLayer) {
    const ids = MyMarkerLayer.geometries.map((item: any) => {
      return item.id;
    });
    MyMarkerLayer.remove(ids);
  }
  if (MyPolylineLayer) {
    const pIds = MyPolylineLayer.geometries.map((item: any) => {
      return item.id;
    });
    MyPolylineLayer.remove(pIds);
  }
};
const connectMark = () => {
  const paths = MyMarkerLayer.geometries.map((item: any) => {
    return item.position;
  });
  if (MyPolylineLayer) {
    const geometries = {
      id: "pl_1", //折线唯一标识，删除时使用
      styleId: "style_blue",
      paths: paths,
    };
    MyPolylineLayer.updateGeometries(geometries);
  } else {
    MyPolylineLayer = polylineLayer(myMap, paths);
  }
};
const carMove = () => {
  MyCarMark.moveAlong(
    {
      car: {
        path,
        speed: 280,
      },
    },
    {
      autoRotation: true,
    }
  );
};
onMounted(() => {
  nextTick(() => {
    myMap = map();
    setMapTheme(activeThemeName.value);
    MyMarkerLayer = markerLayer(myMap);
    MyCarMark = carMark(myMap);
    MyLine = line(myMap);
    myMap.on("click", (evt: Object) => {
      lng.value = evt?.latLng?.lng;
      lat.value = evt?.latLng?.lat;
      MyMarkerLayer.add({
        position: evt.latLng,
      });
    });
    MyCarMark.on("moving", () => {});
  });
});
onUnmounted(() => {
  myMap.destroy();
});
</script>

<template>
  <div class="app-mapTencent">
    <el-card class="card">
      <div class="opertion">
        <div class="latAndLng">
          <el-input v-model="lng" readonly class="mr"></el-input>
          <el-input v-model="lat" readonly class="mr"></el-input>
          <el-button type="warning" @click="resetMark">重置坐标</el-button>
          <el-button type="primary" @click="connectMark">连接坐标</el-button>
        </div>
        <div>
          <el-button type="danger" @click="carMove">开动小车</el-button>
        </div>
      </div>
      <div id="caixMap"></div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 82vh;
  width: 100%;
  cursor: pointer;
}
#caixMap {
  margin-bottom: 20px;
  height: 72vh;
}
.opertion {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .latAndLng {
    display: flex;
    align-items: center;
  }
}
</style>
