/* 
1、getComputedStyle() 这个方法来获取元素当前的样式,这个方法是 window 的方法，可以直接使用

  接收两个参数 params

   第一个：要获取样式的元素
   第二个：可以传递一个伪元素，一般都传null
 
2、getPropertyValue 获取元素的某个 css 属性值

3、Document.documentElement 是一个会返回文档对象（document）的根元素的只读属性（如HTML文档的 <html> 元素）
*/

export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = "";
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVariableName);
  } catch (error) {
    console.log("error");
  }
  return cssVariableValue;
};
