// const SiteStat = require('../models/SiteStat');
// const Project = require('../models/Project');
// const Education = require('../models/Education');
// const Achievement = require('../models/Achievement');
// const Certificate = require('../models/Certificate');
// const Blog = require('../models/Blog');
// const CommunityMember = require('../models/CommunityMember');
// const Contact = require('../models/Contact');
// const ResumeDownload = require('../models/ResumeDownload');
// const AuthLog = require('../models/AuthLog');

// exports.visit = async (req, res) => {
//   let stat = await SiteStat.findById('global');
//   if (!stat) stat = new SiteStat({ _id: 'global', totalVisits: 0 });
//   stat.totalVisits += 1;
//   await stat.save();
//   res.json({ success: true, totalVisits: stat.totalVisits });
// };

// exports.getAllStats = async (req, res) => {
//   const stat = await SiteStat.findById('global') || { totalVisits: 0 };
//   const projectCount = await Project.countDocuments();
//   const educationCount = await Education.countDocuments();
//   const achievementCount = await Achievement.countDocuments();
//   const certificateCount = await Certificate.countDocuments();
//   const blogCount = await Blog.countDocuments();
//   const communityCount = await CommunityMember.countDocuments({ status: 'approved' });
//   const contactCount = await Contact.countDocuments();
//   const resumeCount = await ResumeDownload.countDocuments();
//   const loginFrequency = await AuthLog.aggregate([
//     { $match: { action: 'login' } },
//     { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
//     { $sort: { _id: -1 } },
//     { $limit: 7 }
//   ]);
//   res.json({
//     totalVisits: stat.totalVisits,
//     projectCount, educationCount, achievementCount, certificateCount, blogCount, communityCount,
//     contactCount, resumeCount, loginFrequency
//   });
// };

const SiteStat = require('../models/SiteStat');
const Project = require('../models/Project');
const Education = require('../models/Education');
const Achievement = require('../models/Achievement');
const Certificate = require('../models/Certificate');
const Blog = require('../models/Blog');
const CommunityMember = require('../models/CommunityMember');
const Contact = require('../models/Contact');
const ResumeDownload = require('../models/ResumeDownload');
const AuthLog = require('../models/AuthLog');

exports.visit = async (req, res) => {
  try {
    console.log('Visit endpoint called from IP:', req.ip);
    let stat = await SiteStat.findById('global');
    if (!stat) {
      stat = new SiteStat({ _id: 'global', totalVisits: 0 });
    }
    stat.totalVisits += 1;
    await stat.save();
    console.log('Total visits now:', stat.totalVisits);
    res.json({ success: true, totalVisits: stat.totalVisits });
  } catch (err) {
    console.error('Error in visit endpoint:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllStats = async (req, res) => {
  try {
    const stat = await SiteStat.findById('global') || { totalVisits: 0 };
    const projectCount = await Project.countDocuments();
    const educationCount = await Education.countDocuments();
    const achievementCount = await Achievement.countDocuments();
    const certificateCount = await Certificate.countDocuments();
    const blogCount = await Blog.countDocuments();
    const communityCount = await CommunityMember.countDocuments({ status: 'approved' });
    const contactCount = await Contact.countDocuments();
    const resumeCount = await ResumeDownload.countDocuments();
    const loginFrequency = await AuthLog.aggregate([
      { $match: { action: 'login' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 7 }
    ]);
    res.json({
      totalVisits: stat.totalVisits,
      projectCount, educationCount, achievementCount, certificateCount, blogCount, communityCount,
      contactCount, resumeCount, loginFrequency
    });
  } catch (err) {
    console.error('Error in getAllStats:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};