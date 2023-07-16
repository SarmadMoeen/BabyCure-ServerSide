const express = require('express')
const cors = require('cors')


require("../src/database/connection")

const registration = require('./routers/registration')
const addBabyRouter = require('./routers/babies');
const dietPlanRouter = require('./routers/dietPlan')
const milestonesRouter = require('./routers/milestones')
const physicalActivities = require('./routers/physicalActivities')
const diyRemediesRecipes = require('./routers/diyRemediesRecipes')
const commonProblems = require('./routers/commonProblems')
const vaccinations = require('./routers/vaccinations')
const doneVaccinations = require('./routers/doneVaccination')
const RequestCustomizeDietPlan = require('./routers/reqCustomizeDietPlan')
const MotherDietPlan = require('./routers/motherDietPlan')
const MotherRequestCustomizeDietPlna = require('./routers/reqMotherCustomizeDietPlan')
const Qoutes = require('./routers/qoutes')
const DoctorInfo = require('./routers/doctorInfo')
const bmiCal = require('./routers/bmiCal')
const doctorRegistration = require('./routers/doctorRegistration')
const nutritionistRegister = require('./routers/nutritionistRegistration')
const Payment = require('./routers/payment')
const stripePayment = require('./routers/stripePayment')
const DocumentCustmozieDietPlan = require('./routers/documentCustomizeDietPlan')

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.use(registration)
app.use(addBabyRouter)
app.use(dietPlanRouter)
app.use(vaccinations)
app.use(doneVaccinations)
app.use(milestonesRouter)
app.use(physicalActivities)
app.use(diyRemediesRecipes)
app.use(commonProblems)
app.use(RequestCustomizeDietPlan)
app.use(MotherDietPlan)
app.use(MotherRequestCustomizeDietPlna)
app.use(Qoutes)
app.use(DoctorInfo)
app.use(bmiCal)
app.use(doctorRegistration)
app.use(nutritionistRegister)
app.use(Payment)
app.use(stripePayment)
app.use(DocumentCustmozieDietPlan)
app.use('/uploads', express.static('uploads'));

app.get("/",async(req,res)=>{
    res.send("Hello from BabyCure")
})


app.listen(port, ()=>{
    console.log(`connection is live at Port at. ${port}`);

})