

//% color="#ff9f06" iconWidth=50 iconHeight=40
namespace Sengo1 {
    //% block=" Initialize   Sengo1   port [MODE] addr [ADDR]" blockType="command"
    //% MODE.shadow="dropdown" MODE.options="MODE"
    //% ADDR.shadow="dropdown" ADDR.options="SENTRY"
    export function Begin(parameter: any) {
        let mode = parameter.MODE.code;
        let addr = parameter.ADDR.code;

        Generator.addInclude("ArduinoInclude", "#include <Arduino.h>");
        Generator.addInclude("SentryInclude", "#include <Sentry.h>");

        Generator.addObject(`sengo1.Object`, "Sengo1", `sengo1(${addr});`);

        if (mode == 'Wire') {
            Generator.addInclude("WireInclude", "#include <Wire.h>");
            Generator.addSetupMainTop("Wire.begin", `Wire.begin();`);
        }

        Generator.addCode(`while (SENTRY_OK != sengo1.begin(&${mode})) {yield();}`);
    }


    //% block=" Set   Sengo1   [VISION_STA]   algo [VISION_TYPE]" blockType="command"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"
    //% VISION_STA.shadow="dropdown" VISION_STA.options="VISION_STA"    
    export function VisionSet(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let vision_sta = parameter.VISION_STA.code;
        if (vision_sta == "ON") {
            Generator.addCode(`sengo1.VisionBegin(${vision_type});`);
        } else {
            Generator.addCode(`sengo1.VisionEnd(${vision_type});`);
        }

    }


    //% block=" Set   Sengo1   algo Color   x-coord[XVALUE] y-coord [YVALUE] width[WIDTH] height[HIGHT]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% XVALUE.shadow="number"   XVALUE.defl=150
    //% YVALUE.shadow="number"   YVALUE.defl=120
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    export function SetColorParam(parameter: any) {

        let x = parameter.XVALUE.code;
        let y = parameter.YVALUE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sengo1_object_t", `param;`);
        Generator.addCode(`param.x_value = ${x};`);
        Generator.addCode(`param.y_value = ${y};`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`sengo1.SetParam(Sengo1::kVisionColor,&param);`);
    }
    //% block=" Set   Sengo1   algo Blob   min-width[WIDTH] min-height[HIGHT] color [COLOR_LABLE]" blockType="command"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=25    NUM.defl=1
    //% WIDTH.shadow="number"   WIDTH.defl=3
    //% HIGHT.shadow="number"   HIGHT.defl=4
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"
    export function SetBlobParam(parameter: any) {

        let l = parameter.COLOR_LABLE.code;
        let w = parameter.WIDTH.code;
        let h = parameter.HIGHT.code;

        Generator.addObject("param_obj", "sengo1_object_t", `param;`);
        Generator.addCode(`param.width = ${w};`);
        Generator.addCode(`param.height = ${h};`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sengo1.SetParam(Sengo1::kVisionBlob,&param);`);
    }

    
    //% block=" Set   Sengo1   algo Face  [COLOR_LABLE] ID [NUM]"
    //% NUM.shadow="range"   NUM.params.min=1    NUM.params.max=11    NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="FACE_PARAM"
    export function SetFaceParam(parameter: any) {
        let num = parameter.NUM.code;
        let l = parameter.COLOR_LABLE.code;

        Generator.addObject("param_obj", "sengo1_object_t", `param;`);
        Generator.addCode(`param.label = ${l};`);
        Generator.addCode(`sengo1.SetParam(Sengo1::kVisionFace,,&param,(int)${num});`);
    }

    //% block="  Sengo1   algo[VISION_TYPE]   num of results" blockType="reporter" 
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_ALL"    
    export function GetVisionResult(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        Generator.addCode([`sengo1.GetValue(${vision_type}, kStatus)`, Generator.ORDER_UNARY_POSTFIX]);
    }

    
    //% block="  Sengo1   algo Color   [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_COLOR"    
    export function GetColorValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionColor,${obj})`, Generator.ORDER_UNARY_POSTFIX]);
    }
    
    //% block="  Sengo1   algo[VISION_TYPE]    [OBJ_INFO] of result [NUM]" blockType="reporter"
    //% VISION_TYPE.shadow="dropdown" VISION_TYPE.options="VISION_TYPE_VALUE"
    //% NUM.shadow="number"  NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO"    
    export function GetValue(parameter: any) {

        let vision_type = parameter.VISION_TYPE.code;
        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo1.GetValue(${vision_type},${obj})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo1   algo Line    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_LINE"    
    export function GetLineValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionLine,${obj})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo1   algo QrCode    [OBJ_INFO] of result [NUM]" blockType="reporter"   
    //% NUM.shadow="number" NUM.defl=1
    //% OBJ_INFO.shadow="dropdown" OBJ_INFO.options="OBJ_INFO_QR"    
    export function GetQrCodeValue(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.OBJ_INFO.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionQrCode,${obj})`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="  Sengo1   algo QrCode   string   of decoding result" blockType="reporter"
    export function GetQrCodeValueStr(parameter: any) {

        Generator.addCode([`String(sengo1.GetQrCodeValueStr())`, Generator.ORDER_UNARY_POSTFIX]);
    }

        
    //% block=" Sengo1   algo Color   recognized [COLOR_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionColor,kLabel)==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo1   algo Blob   detected [COLOR_LABLE] blob result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% COLOR_LABLE.shadow="dropdown" COLOR_LABLE.options="COLOR_LABLE"    
    export function GetColorBlob(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.COLOR_LABLE.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionBlob,kLabel)==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block=" Sengo1   algo Card   recognized [CARD_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% CARD_LABLE.shadow="dropdown" CARD_LABLE.options="CARD_LABLE"    
    export function GetCardLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.CARD_LABLE.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionCard,kLabel)==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
    
    //% block=" Sengo1   algo Ball   recognized [BALL_LABLE] result [NUM]" blockType="boolean"
    //% NUM.shadow="number" NUM.defl=1
    //% BALL_LABLE.shadow="dropdown" BALL_LABLE.options="BALL_LABLE"    
    export function GetBallLable(parameter: any) {

        let num = parameter.NUM.code;
        let obj = parameter.BALL_LABLE.code;
        Generator.addCode([`sengo1.GetValue(Sengo1::kVisionBall,kLabel)==${obj}`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
