const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Customer = require('./models/Customer');
const Rate = require('./models/Rate');
const Billing = require('./models/Billing');
const Inventory = require('./models/Inventory');
const Repair = require('./models/Repair');
const Loan = require('./models/Loan');
const Counter = require('./models/Counter');
const Settings = require('./models/Settings');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Customer.deleteMany(),
      Rate.deleteMany(),
      Billing.deleteMany(),
      Inventory.deleteMany(),
      Repair.deleteMany(),
      Loan.deleteMany(),
      Counter.deleteMany(),
      Settings.deleteMany()
    ]);

    console.log('Cleared existing data.');

    // 1. Create Default Admin
    const admin = await User.create({
      name: 'Radhe Admin',
      email: 'admin@radhejewellers.com',
      password: 'Admin@123',
      role: 'Admin'
    });
    console.log('Admin user created.');

    // 2. Create Sample Customers
    const customers = await Customer.insertMany([
      { name: 'Rajesh Kumar', mobile: '9876543210', email: 'rajesh@example.com', address: '45, Sunshine Colony, Mumbai', verificationStatus: 'Verified' },
      { name: 'Priya Sharma', mobile: '8765432109', email: 'priya@example.com', address: '12, Pearl Tower, Mumbai', verificationStatus: 'Verified' },
      { name: 'Amit Verma', mobile: '7654321098', email: 'amit@example.com', address: '8, Diamond Street, Mumbai', verificationStatus: 'Pending' },
      { name: 'Sneha Gupta', mobile: '9988776655', email: 'sneha@example.com', address: '102, Gold Park, Mumbai', verificationStatus: 'Verified' },
      { name: 'Vikram Singh', mobile: '8877665544', email: 'vikram@example.com', address: '23, Silver Plaza, Mumbai', verificationStatus: 'Verified' }
    ]);
    console.log('Sample customers created.');

    // 3. Create Current Rates
    const rates = await Rate.insertMany([
      { metalType: 'Gold', purity: '24K', ratePerGram: 6500 },
      { metalType: 'Gold', purity: '22K', ratePerGram: 6050 },
      { metalType: 'Gold', purity: '18K', ratePerGram: 4875 },
      { metalType: 'Silver', purity: '999 Silver', ratePerGram: 75 },
      { metalType: 'Silver', purity: '925 Silver', ratePerGram: 70 }
    ]);
    console.log('Initial rates created.');

    // 4. Create Inventory Items
    await Inventory.insertMany([
      { itemName: 'Bridal Gold Necklace', metalType: 'Gold', category: 'Necklace', weight: 45.5, purity: '22K', purchasePrice: 250000, sellingPrice: 285000, status: 'Available' },
      { itemName: 'Gold Bangles Set', metalType: 'Gold', category: 'Bangle', weight: 32.0, purity: '22K', purchasePrice: 180000, sellingPrice: 210000, status: 'Available' },
      { itemName: 'Diamond Studded Ring', metalType: 'Gold', category: 'Ring', weight: 4.5, purity: '18K', purchasePrice: 45000, sellingPrice: 65000, status: 'Available' },
      { itemName: 'Silver Anklets', metalType: 'Silver', category: 'Anklet', weight: 85.0, purity: '925 Silver', purchasePrice: 5500, sellingPrice: 7500, status: 'Available' },
      { itemName: 'Pure Gold Coin', metalType: 'Gold', category: 'Coin', weight: 10.0, purity: '24K', purchasePrice: 62000, sellingPrice: 66500, status: 'Available' }
    ]);
    console.log('Sample inventory created.');

    // 5. Create Sample Bills
    await Billing.create({
      billNumber: 'BILL-1001',
      customer: customers[0]._id,
      transactionType: 'Sell',
      metalType: 'Gold',
      ornamentType: 'Chain',
      weight: 12.5,
      purity: '22K',
      rate: 6050,
      makingCharges: 5000,
      gstPercentage: 3,
      metalValue: 75625,
      finalAmount: 83043,
      paymentMode: 'UPI',
      createdBy: admin._id
    });
    console.log('Sample bills created.');

    // 6. Create Sample Repairs
    await Repair.create({
      repairId: 'REP-1001',
      customer: customers[1]._id,
      mobile: customers[1].mobile,
      ornamentType: 'Gold Ring',
      metalType: 'Gold',
      problemDescription: 'Size adjustment and polishing',
      estimatedCharge: 1500,
      status: 'In Progress',
      expectedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });
    console.log('Sample repairs created.');

    // 7. Create Sample Loans
    await Loan.create({
      loanId: 'LOAN-1001',
      customer: customers[2]._id,
      mobile: customers[2].mobile,
      ornamentType: 'Gold Necklace',
      metalType: 'Gold',
      weight: 25.0,
      purity: '22K',
      estimatedValue: 150000,
      loanPercentage: 75,
      loanAmount: 112500,
      monthlyInterestRate: 1.5,
      durationMonths: 6,
      startDate: new Date(),
      dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      interestAmount: 10125,
      finalPayableAmount: 122625,
      remainingAmount: 122625,
      status: 'Active'
    });
    console.log('Sample loans created.');

    // 8. Create Counters
    await Counter.insertMany([
      { name: 'BILL', seq: 1001 },
      { name: 'REP', seq: 1001 },
      { name: 'LOAN', seq: 1001 }
    ]);
    
    // 9. Create Settings
    await Settings.create({
      shopName: 'Radhe Jewellers',
      tagline: 'Trusted Gold & Silver Services',
      address: '123 Jewellery Lane, Main Bazaar, City - 400001, India',
      phone: '+91 98765 43210',
      email: 'info@radhejewellers.com',
      invoicePrefix: 'BILL'
    });

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
