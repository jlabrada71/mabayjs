import nodemailer  from 'nodemailer';


describe('Send email tests', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    //ProblemRepository.mockClear();

  });

  it('should generate code for value objects', () => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'juan.labrada@gmail.com',
        pass: 'Luis@))^'
      }
    });

    var mailOptions = {
      from: 'juan.labrada@gmail.com',
      to: 'jlabrada@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    var mailOptionsMultipleRecivers = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    }

    var mailOptionsHtml = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      html: '<h1>Welcome</h1><p>That was easy!</p>'
    }
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
});
