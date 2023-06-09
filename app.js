const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const first=req.body.f_name;
    const last=req.body.l_name;
    const email=req.body.email;

     console.log(first,last,email);

    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:first,
                LNAME:last

            }
        }
        ]
    }

    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/0e76e1243f";
    const options={
        method:"POST",
        auth:"hansa:7ac8ddaf7236f09a1add62162350f8ae-us21"
    }

   const request= https.request(url,options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}


response.on("data",function(data){
    console.log(JSON.parse(data));
});
    });

    request.write(jsonData);
    request.end();
    

});


app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
});



// api Key
// 7ac8ddaf7236f09a1add62162350f8ae-us21

// list id
// 0e76e1243f