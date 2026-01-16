const Listing=require('../models/listing.js');
// module.exports.index=async(req,res)=>{
//     const allListings=await Listing.find({});
//     res.render('./listings/index.ejs',{allListings});
// };
module.exports.index = async (req, res) => {
    const { category } = req.query; // Get category from URL query string
    let filter = {};
    if (category) {
        filter = { category: category };
    }
    const allListings = await Listing.find(filter);
    res.render('./listings/index.ejs', { allListings, category });
};
module.exports.renderNewForm=(req,res)=>{
    res.render('./listings/new.ejs');
};
module.exports.showListing=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate('owner');
    if(!listing){
        req.flash('error','Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    console.log(listing);
    
    res.render('./listings/show.ejs',{listing});
};
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
module.exports.createListing=async(req,res)=>{  
    // 1. Geocode the location
    // const response = await client.geocode({
    //     params: {
    //         address: req.body.listing.location,
    //         key: process.env.MAP_API_KEY, // Use your API Key from .env
    //     },
    // });

    // 2. Extract coordinates
    // let lat = 0, lng = 0;
    // if (response.data.results.length > 0) {
    //     const { location } = response.data.results[0].geometry;
    //     lat = location.lat;
    //     lng = location.lng;
    // }

    let url=req.file.path;
    let filename=req.file.filename;
    
    let newListing=new Listing(req.body.listing); 
    newListing.owner=req.user._id;
    newListing.image={url,filename};

    // newListing.lat = lat;
    // newListing.lng = lng;

    await newListing.save();
    req.flash('success','New Listing Created!');
    res.redirect('/listings');
};

module.exports.renderEditForm=async(req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash('error','Listing you requested for does not exist!');
        return res.redirect('/listings');
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace('/upload','/upload/h_300,w_300');
    res.render('./listings/edit.ejs',{listing,originalImageUrl});
};
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    // 2. Re-geocode if the location string was updated
    // if (req.body.listing.location) {
    //     // const response = await client.geocode({
    //     //     params: {
    //     //         address: req.body.listing.location,
    //     //         key: process.env.MAP_API_KEY,
    //     //     },
    //     // });

    //     // if (response.data.results.length > 0) {
    //     //     const { location } = response.data.results[0].geometry;
    //     //     listing.lat = location.lat;
    //     //     listing.lng = location.lng;
    //     // }
    // }
    if(typeof req.file !== 'undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash('success','Listing Updated!');
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing=async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Listing Deleted!');
    res.redirect('/listings');
};