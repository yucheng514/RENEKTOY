export class ChangeOutputPath{
    apply(hooks){
        hooks.emitFile.tap("changeOutputPath", (context)=>{
            console.log("changeOutputPath")
            context.changeOutputPath("./_dist/hyc.js")
        })
    }
}