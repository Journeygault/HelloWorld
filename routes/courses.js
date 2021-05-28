const express = require('express');
const router = express.Router()//Calls express but routes to a diferent file

const courses =[
    {id:1,name:'courses1'},
    {id:2,name:'courses2'},
    {id:3,name:'courses3'}
];

router.get('/',(req,res)=>{
    //We are not at database hook up yet, simply returning an array of numbers

    res.send(courses) ;
});


//Simple Get request
router.get('/:id',(req,res)=>{
//    res.send(req.params.id);
   const course = courses.find(c =>c.id === parseInt(req.params.id))
   if(!course) return res.status(404).send ('the course with the  given ID was not found');//IF COURSE NOT FOUND 404
   res.send(course);
});
//Simple Post Request
router.post('/',(req,res)=>{
   
    //Validation By Function
    const {error} = validateCourse(req.body);//equivilent to result.error

    if (error) return res.status(400).send(error.details[0].message);
    
    const course ={
        //Manually assigned ID since no database connection
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

//Simple Update
router.put('/:id',(req,res)=>{
    //Look up course
    const course = courses.find(c =>c.id === parseInt(req.params.id))
   if(!course) return res.status(404).send ('the course with the  given ID was not found');
    //if does not exist return 404
    //Validate, if not valid return 400

//

    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);//equivilent to result.error
    if (error)return res.status(400).send(error.details[0].message);
    
    //update course
    course.name = req.body.name;
    res.send(course)
    //return updated course to the client
})

 //When you search add: ?sortBy=name at the end of url
// SIMPLE DELETE 
router.delete('/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send ('the course with the  given ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index,1); //THIS IS THE DELETE PART

    res.send(course);

});

 function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
        
    }
    return Joi.validate(course,schema);

}

module.exports = router;