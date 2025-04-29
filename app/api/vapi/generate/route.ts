
import {generateText} from "ai"
import {google} from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils"
import { db } from "@/firebase/admin"
export async function GET(){
    return Response.json({success:true,data:"Thank you"},{status:200})
}




export async function POST(request:Request){
        const {type,role,level,techstack,amount,userid} = await request.json()

        try {

            const {text:questions} = await generateText({
                model:google('gemini-2.0-flash-001'),
                prompt:`intervu ucun suallar tertib et.
                muraciet edilen role ${role}.
                muraciet edilen is seviyyesi ${level}.
                techStak ${techstack}
                fokuslanacaq tip ${type}
                sual sayi ${amount}.
                Bu suallari voice asistan ucun hazirlayacam. suallari ona uygun hazirla. Ve zehmet olmasa ancaq suallari hazirla, "/" ,"*" ve basqa xususi isareler olmasin.
                suallari asagidaki kimi fomatda olsun
                ["Question 1",  "Question 2"] 
                `
            })

            const interview  = {
                    role,type,level,
                    techstack:techstack?.split(","),
                    questions:JSON.parse(questions),
                    userid:userid,
                    finalized:true,
                    coverimage:getRandomInterviewCover(),
                    createdAt:new Date().toISOString()  
            } 
            await db.collection('interviews').add(interview)
            return Response.json({success:true},{status:200})
        } catch (error) {
            console.log(error);
            return Response.json({
                "success":false, 
                error:error
            },{status:500})
        }
}    