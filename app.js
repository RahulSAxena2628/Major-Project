const express=require('express');
const ejs=require('ejs')
const app=express();
const mongoose=require('mongoose');
const Listing = require('./models/listing.js');
const path=require('path');
app.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate=require('ejs-mate');  
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');


const mongoUrl="mongodb://127.0.0.1:27017/wanderlust";
main().then((data)=>{
    console.log("connected to database");
}).catch((err)=>{ console.log(err)});
async function main(){
    await mongoose.connect(mongoUrl);}


app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send("Hello i am root");
});
// app.get("/testListing",async (req,res)=>{
//     let samleListing=new listing({
//         title:"my new villa",
//         description:"By the beech",
//         price:1100,
//         location:"Goa",
//         country:"India"
//     });
//     await samleListing.save();
//     console.log("sample saved");
//     res.send("successfull testing")
// }
// );

//Index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });


  //new route

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});



//show route

app.get("/listings/:id",async (req,res)=>{
    const {id}=req.params;
    const foundListing=await Listing.findById(id);
    res.render("listings/show.ejs",{foundListing});
});


//create route

// app.post("/listings",async(req,res)=>{
//     const newList=new Listing(req.body.list);
//     await newList.save();
//     res.redirect("http://localhost:3001/listings")
    

// })

app.post('/listings', async (req, res,next ) => {
    try{
        try {
            const newList = new Listing(req.body.listing);
            // Set default image if none provided
            if (!newList.image || !newList.image.url) {
                newList.image = {
                    url: "https://images.unsplash.com/photo-1735337634443-6e37a373e501?q=80&w=1470&auto=format&fit=crop",
                    filename: "listingimage"
                };
            }
            await newList.save();
            res.redirect('/listings');
        } catch (err) {
            next(err);
        }
    }catch(err){
        next(err);
    }
});

//edit routr
app.get("/listings/:id/edit",async (req,res)=>{   
    try{
        let list = await Listing.findById(req.params.id);
        if (!list) {
            return res.status(404).send("Listing not found");
        }
        // Combine list and image data into a single object
        console.log(list);
        res.render("listings/edit.ejs", { list });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading edit form");
    }
}); 
//update route
app.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Create listing object with proper image structure
        const listing = {
            ...req.body.listing,
            image: {
                filename: 'listingimage',
                url: req.body.listing.image // Changed from req.body.listing.url to req.body.listing.image
            }
        };
        // Use the listing object instead of req.body.listing
        await Listing.findByIdAndUpdate(id, listing);
        res.redirect(`/listings/${id}`);   
    } catch(err) {
        console.error(err);
        res.status(500).send("Error updating listing");
    }
});

//delete route
app.delete("/listings/:id",async (req,res)=>{
  
    const {id}=req.params;
    let deleting_listing=await Listing.findByIdAndDelete(id);
    console.log(deleting_listing);
    res.redirect('/listings');
  
});

app.use((err,req,res,next)=>{

    res.send("Something went wrong");
});

app.listen(3001,()=>{
    console.log("app is listining at port 3002")
})


