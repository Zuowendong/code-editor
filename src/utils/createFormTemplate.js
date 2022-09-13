import ejs from "ejs";
import getFileData from "./getFileData";

export default (config) => {
    // const formTemplate = await getFileData("/static/form.ejs");
    // const code = ejs.render(
    //     formTemplate.toString(),
    //     {
    //         config,
    //     },
    //     { rmWhitespace }
    // );

    // console.log(233333333333333333, code);

    // let res = code.replace(/\r\n/g, "");
    // res = res.replace(/</g, "&lt;");
    // res = res.replace(/>/g, "&gt;<br>");
    // res = res.replace(/}/g, "}<br>");

    // console.log(12222222222222, res);

    // ejs.renderFile('../../public/static/form.ejs', {
    //   config
    // }, {}, (err, str) => {
    //   console.log('createFormTemplate.js', str);

    // })

    let html = "";
    ejs.renderFile(
        "../template/form.ejs",
        { title: "<h4>express</h4>" },
        {},
        function (err, str) {
            // str => 输出绘制后的 HTML
            console.log("server.js", str);
            html = str;
        }
    );

    return html;
};
