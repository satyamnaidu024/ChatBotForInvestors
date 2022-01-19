const Faq = require('../models/faq')

const APIFeatures = require('../utils/apiFeatures')

//Create new faq => /api/v1/admin/faq/new
exports.newFaq = async (req,res,next) => {
         
    const faq = await Faq.create(req.body);

    res.status(201).json({
        success:true,
        faq
    })
}

//Get all faqs => /api/v1/faqs
exports.getFaqs = async(req,res,next)=>{

    // const resPerPage = 20;
    // const faqCount = await Faq.countDocuments()
    // const apiFeatures = new APIFeatures(Faq.find(),req.query)
    //                        .search()
    //                        .filter()
    //                        .pagination(resPerPage)
    const faqs = await Faq.find();
    res.status(200).json({
        success:true,
         count:faqs.length,
        // faqCount,
        // resPerPage,
         faqs
    })
}

//Get single faq => /api/v1/faq/:id
exports.getSingleFaq = async(req,res,next)=>{
    const faq = await Faq.findById(req.params.id);
    if(!faq){
        res.status(404).json({
            success:false,
            message:'faq not found'
        })  
    }

    res.status(200).json({
        success:true,
        faq
    })
}

//Update a faq => /api/v1/admin/faq/:id
exports.updateFaq = async(req,res,next)=>{
    let faq = await Faq.findById(req.params.id);
    if(!faq){
        res.status(404).json({
            success:false,
            message:'faq not found'
        })  
    }

    faq = await Faq.findByIdAndUpdate(req.params.id,req.body,
        {
        new:true,
        runValidators:true,
        UseFindAndModify:false
        });

    res.status(200).json({
        success:true,
        faq
    })
}

//delete a faq => /api/v1/admin/faq/:id
exports.deleteFaq = async(req,res,next)=>{
    const faq = await Faq.findById(req.params.id);
    if(!faq){
        res.status(404).json({
            success:false,
            message:'faq not found'
        })  
    }

   await Faq.deleteOne();
   
    res.status(200).json({
        success:true,
        message: 'faq deleted'
    })
}