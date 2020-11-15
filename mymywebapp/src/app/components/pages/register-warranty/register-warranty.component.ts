import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import {ProductregistrationService} from '../../shared/services/productregistration.service';
@Component({
  selector: 'app-register-warranty',
  templateUrl: './register-warranty.component.html',
  styleUrls: ['./register-warranty.component.sass']
})
export class RegisterWarrantyComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  rstates = 
  [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    },
    {
      "name": "None",
      "abbreviation": "None"
  }

]
  rcntries = 
  [
    {
      code: 'none',
      name: 'none'
    },
    {
      code: 'AF',
      name: 'Afghanistan'
    }, {
      code: 'AL',
      name: 'Albania'
    }, {
      code: 'DZ',
      name: 'Algeria'
    }, {
      code: 'AS',
      name: 'American Samoa'
    }, {
      code: 'AD',
      name: 'Andorre'
    }, {
      code: 'AO',
      name: 'Angola'
    }, {
      code: 'AI',
      name: 'Anguilla'
    }, {
      code: 'AQ',
      name: 'Antarctica'
    }, {
      code: 'AG',
      name: 'Antigua and Barbuda'
    }, {
      code: 'AR',
      name: 'Argentina'
    }, {
      code: 'AM',
      name: 'Armenia'
    }, {
      code: 'AW',
      name: 'Aruba'
    }, {
      code: 'AU',
      name: 'Australia'
    }, {
      code: 'AT',
      name: 'Austria'
    }, {
      code: 'AZ',
      name: 'Azerbaijan'
    }, {
      code: 'BS',
      name: 'Bahamas'
    }, {
      code: 'BH',
      name: 'Bahrain'
    }, {
      code: 'BD',
      name: 'Bangladesh'
    }, {
      code: 'BB',
      name: 'Barbade'
    }, {
      code: 'BY',
      name: 'Belarus'
    }, {
      code: 'BE',
      name: 'Belgium'
    }, {
      code: 'BZ',
      name: 'Belize'
    }, {
      code: 'BJ',
      name: 'Benin'
    }, {
      code: 'BM',
      name: 'Bermuda'
    }, {
      code: 'BT',
      name: 'Bhutan'
    }, {
      code: 'BO',
      name: 'Bolivia'
    }, {
      code: 'BQ',
      name: 'Bonaire, Sint Eustatius and Saba'
    }, {
      code: 'BA',
      name: 'Bosnia and Herzegovina'
    }, {
      code: 'BW',
      name: 'Botswana'
    }, {
      code: 'BV',
      name: 'Bouvet Island'
    }, {
      code: 'BR',
      name: 'Brazil'
    }, {
      code: 'IO',
      name: 'British Indian Ocean Territory'
    }, {
      code: 'VG',
      name: 'British Virgin Islands'
    }, {
      code: 'BN',
      name: 'Brunei'
    }, {
      code: 'BG',
      name: 'Bulgaria'
    }, {
      code: 'BF',
      name: 'Burkina Faso'
    }, {
      code: 'BI',
      name: 'Burundi'
    }, {
      code: 'KH',
      name: 'Cambodia'
    }, {
      code: 'CM',
      name: 'Cameroon'
    }, {
      code: 'CA',
      name: 'Canada'
    }, {
      code: 'CV',
      name: 'Cape Verde'
    }, {
      code: 'KY',
      name: 'Cayman Islands'
    }, {
      code: 'CF',
      name: 'Central African Republic'
    }, {
      code: 'TD',
      name: 'Chad'
    }, {
      code: 'CL',
      name: 'Chile'
    }, {
      code: 'CN',
      name: 'China'
    }, {
      code: 'CX',
      name: 'Christmas Island'
    }, {
      code: 'CC',
      name: 'Cocos (Keeling) Islands'
    }, {
      code: 'CO',
      name: 'Colombia'
    }, {
      code: 'KM',
      name: 'Comoros'
    }, {
      code: 'CG',
      name: 'Congo'
    }, {
      code: 'CD',
      name: 'Congo (Dem. Rep.)'
    }, {
      code: 'CK',
      name: 'Cook Islands'
    }, {
      code: 'CR',
      name: 'Costa Rica'
    }, {
      code: 'ME',
      name: 'Crna Gora'
    }, {
      code: 'HR',
      name: 'Croatia'
    }, {
      code: 'CU',
      name: 'Cuba'
    }, {
      code: 'CW',
      name: 'Curaçao'
    }, {
      code: 'CY',
      name: 'Cyprus'
    }, {
      code: 'CZ',
      name: 'Czech Republic'
    }, {
      code: 'CI',
      name: "Côte D'Ivoire"
    }, {
      code: 'DK',
      name: 'Denmark'
    }, {
      code: 'DJ',
      name: 'Djibouti'
    }, {
      code: 'DM',
      name: 'Dominica'
    }, {
      code: 'DO',
      name: 'Dominican Republic'
    }, {
      code: 'TL',
      name: 'East Timor'
    }, {
      code: 'EC',
      name: 'Ecuador'
    }, {
      code: 'EG',
      name: 'Egypt'
    }, {
      code: 'SV',
      name: 'El Salvador'
    }, {
      code: 'GQ',
      name: 'Equatorial Guinea'
    }, {
      code: 'ER',
      name: 'Eritrea'
    }, {
      code: 'EE',
      name: 'Estonia'
    }, {
      code: 'ET',
      name: 'Ethiopia'
    }, {
      code: 'FK',
      name: 'Falkland Islands'
    }, {
      code: 'FO',
      name: 'Faroe Islands'
    }, {
      code: 'FJ',
      name: 'Fiji'
    }, {
      code: 'FI',
      name: 'Finland'
    }, {
      code: 'FR',
      name: 'France'
    }, {
      code: 'GF',
      name: 'French Guiana'
    }, {
      code: 'PF',
      name: 'French Polynesia'
    }, {
      code: 'TF',
      name: 'French Southern Territories'
    }, {
      code: 'GA',
      name: 'Gabon'
    }, {
      code: 'GM',
      name: 'Gambia'
    }, {
      code: 'GE',
      name: 'Georgia'
    }, {
      code: 'DE',
      name: 'Germany'
    }, {
      code: 'GH',
      name: 'Ghana'
    }, {
      code: 'GI',
      name: 'Gibraltar'
    }, {
      code: 'GR',
      name: 'Greece'
    }, {
      code: 'GL',
      name: 'Greenland'
    }, {
      code: 'GD',
      name: 'Grenada'
    }, {
      code: 'GP',
      name: 'Guadeloupe'
    }, {
      code: 'GU',
      name: 'Guam'
    }, {
      code: 'GT',
      name: 'Guatemala'
    }, {
      code: 'GG',
      name: 'Guernsey and Alderney'
    }, {
      code: 'GN',
      name: 'Guinea'
    }, {
      code: 'GW',
      name: 'Guinea-Bissau'
    }, {
      code: 'GY',
      name: 'Guyana'
    }, {
      code: 'HT',
      name: 'Haiti'
    }, {
      code: 'HM',
      name: 'Heard and McDonald Islands'
    }, {
      code: 'HN',
      name: 'Honduras'
    }, {
      code: 'HK',
      name: 'Hong Kong'
    }, {
      code: 'HU',
      name: 'Hungary'
    }, {
      code: 'IS',
      name: 'Iceland'
    }, {
      code: 'IN',
      name: 'India'
    }, {
      code: 'ID',
      name: 'Indonesia'
    }, {
      code: 'IR',
      name: 'Iran'
    }, {
      code: 'IQ',
      name: 'Iraq'
    }, {
      code: 'IE',
      name: 'Ireland'
    }, {
      code: 'IM',
      name: 'Isle of Man'
    }, {
      code: 'IL',
      name: 'Israel'
    }, {
      code: 'IT',
      name: 'Italy'
    }, {
      code: 'JM',
      name: 'Jamaica'
    }, {
      code: 'JP',
      name: 'Japan'
    }, {
      code: 'JE',
      name: 'Jersey'
    }, {
      code: 'JO',
      name: 'Jordan'
    }, {
      code: 'KZ',
      name: 'Kazakhstan'
    }, {
      code: 'KE',
      name: 'Kenya'
    }, {
      code: 'KI',
      name: 'Kiribati'
    }, {
      code: 'KP',
      name: 'Korea (North)'
    }, {
      code: 'KR',
      name: 'Korea (South)'
    }, {
      code: 'KW',
      name: 'Kuwait'
    }, {
      code: 'KG',
      name: 'Kyrgyzstan'
    }, {
      code: 'LA',
      name: 'Laos'
    }, {
      code: 'LV',
      name: 'Latvia'
    }, {
      code: 'LB',
      name: 'Lebanon'
    }, {
      code: 'LS',
      name: 'Lesotho'
    }, {
      code: 'LR',
      name: 'Liberia'
    }, {
      code: 'LY',
      name: 'Libya'
    }, {
      code: 'LI',
      name: 'Liechtenstein'
    }, {
      code: 'LT',
      name: 'Lithuania'
    }, {
      code: 'LU',
      name: 'Luxembourg'
    }, {
      code: 'MO',
      name: 'Macao'
    }, {
      code: 'MK',
      name: 'Macedonia'
    }, {
      code: 'MG',
      name: 'Madagascar'
    }, {
      code: 'MW',
      name: 'Malawi'
    }, {
      code: 'MY',
      name: 'Malaysia'
    }, {
      code: 'MV',
      name: 'Maldives'
    }, {
      code: 'ML',
      name: 'Mali'
    }, {
      code: 'MT',
      name: 'Malta'
    }, {
      code: 'MH',
      name: 'Marshall Islands'
    }, {
      code: 'MQ',
      name: 'Martinique'
    }, {
      code: 'MR',
      name: 'Mauritania'
    }, {
      code: 'MU',
      name: 'Mauritius'
    }, {
      code: 'YT',
      name: 'Mayotte'
    }, {
      code: 'MX',
      name: 'Mexico'
    }, {
      code: 'FM',
      name: 'Micronesia'
    }, {
      code: 'MD',
      name: 'Moldova'
    }, {
      code: 'MC',
      name: 'Monaco'
    }, {
      code: 'MN',
      name: 'Mongolia'
    }, {
      code: 'MS',
      name: 'Montserrat'
    }, {
      code: 'MA',
      name: 'Morocco'
    }, {
      code: 'MZ',
      name: 'Mozambique'
    }, {
      code: 'MM',
      name: 'Myanmar'
    }, {
      code: 'NA',
      name: 'Namibia'
    }, {
      code: 'NR',
      name: 'Nauru'
    }, {
      code: 'NP',
      name: 'Nepal'
    }, {
      code: 'NL',
      name: 'Netherlands'
    }, {
      code: 'AN',
      name: 'Netherlands Antilles'
    }, {
      code: 'NC',
      name: 'New Caledonia'
    }, {
      code: 'NZ',
      name: 'New Zealand'
    }, {
      code: 'NI',
      name: 'Nicaragua'
    }, {
      code: 'NE',
      name: 'Niger'
    }, {
      code: 'NG',
      name: 'Nigeria'
    }, {
      code: 'NU',
      name: 'Niue'
    }, {
      code: 'NF',
      name: 'Norfolk Island'
    }, {
      code: 'MP',
      name: 'Northern Mariana Islands'
    }, {
      code: 'NO',
      name: 'Norway'
    }, {
      code: 'OM',
      name: 'Oman'
    }, {
      code: 'PK',
      name: 'Pakistan'
    }, {
      code: 'PW',
      name: 'Palau'
    }, {
      code: 'PS',
      name: 'Palestine'
    }, {
      code: 'PA',
      name: 'Panama'
    }, {
      code: 'PG',
      name: 'Papua New Guinea'
    }, {
      code: 'PY',
      name: 'Paraguay'
    }, {
      code: 'PE',
      name: 'Peru'
    }, {
      code: 'PH',
      name: 'Philippines'
    }, {
      code: 'PN',
      name: 'Pitcairn'
    }, {
      code: 'PL',
      name: 'Poland'
    }, {
      code: 'PT',
      name: 'Portugal'
    }, {
      code: 'PR',
      name: 'Puerto Rico'
    }, {
      code: 'QA',
      name: 'Qatar'
    }, {
      code: 'RO',
      name: 'Romania'
    }, {
      code: 'RU',
      name: 'Russia'
    }, {
      code: 'RW',
      name: 'Rwanda'
    }, {
      code: 'RE',
      name: 'Réunion'
    }, {
      code: 'BL',
      name: 'Saint Barthélemy'
    }, {
      code: 'SH',
      name: 'Saint Helena'
    }, {
      code: 'KN',
      name: 'Saint Kitts and Nevis'
    }, {
      code: 'LC',
      name: 'Saint Lucia'
    }, {
      code: 'MF',
      name: 'Saint Martin'
    }, {
      code: 'PM',
      name: 'Saint Pierre and Miquelon'
    }, {
      code: 'VC',
      name: 'Saint Vincent and the Grenadines'
    }, {
      code: 'WS',
      name: 'Samoa'
    }, {
      code: 'SM',
      name: 'San Marino'
    }, {
      code: 'SA',
      name: 'Saudi Arabia'
    }, {
      code: 'SN',
      name: 'Senegal'
    }, {
      code: 'RS',
      name: 'Serbia'
    }, {
      code: 'SC',
      name: 'Seychelles'
    }, {
      code: 'SL',
      name: 'Sierra Leone'
    }, {
      code: 'SG',
      name: 'Singapore'
    }, {
      code: 'SX',
      name: 'Sint Maarten'
    }, {
      code: 'SK',
      name: 'Slovakia'
    }, {
      code: 'SI',
      name: 'Slovenia'
    }, {
      code: 'SB',
      name: 'Solomon Islands'
    }, {
      code: 'SO',
      name: 'Somalia'
    }, {
      code: 'ZA',
      name: 'South Africa'
    }, {
      code: 'GS',
      name: 'South Georgia and the South Sandwich Islands'
    }, {
      code: 'SS',
      name: 'South Sudan'
    }, {
      code: 'ES',
      name: 'Spain'
    }, {
      code: 'LK',
      name: 'Sri Lanka'
    }, {
      code: 'SD',
      name: 'Sudan'
    }, {
      code: 'SR',
      name: 'Suriname'
    }, {
      code: 'SJ',
      name: 'Svalbard and Jan Mayen'
    }, {
      code: 'SZ',
      name: 'Swaziland'
    }, {
      code: 'SE',
      name: 'Sweden'
    }, {
      code: 'CH',
      name: 'Switzerland'
    }, {
      code: 'SY',
      name: 'Syria'
    }, {
      code: 'ST',
      name: 'São Tomé and Príncipe'
    }, {
      code: 'TW',
      name: 'Taiwan'
    }, {
      code: 'TJ',
      name: 'Tajikistan'
    }, {
      code: 'TZ',
      name: 'Tanzania'
    }, {
      code: 'TH',
      name: 'Thailand'
    }, {
      code: 'TG',
      name: 'Togo'
    }, {
      code: 'TK',
      name: 'Tokelau'
    }, {
      code: 'TO',
      name: 'Tonga'
    }, {
      code: 'TT',
      name: 'Trinidad and Tobago'
    }, {
      code: 'TN',
      name: 'Tunisia'
    }, {
      code: 'TR',
      name: 'Turkey'
    }, {
      code: 'TM',
      name: 'Turkmenistan'
    }, {
      code: 'TC',
      name: 'Turks and Caicos Islands'
    }, {
      code: 'TV',
      name: 'Tuvalu'
    }, {
      code: 'UG',
      name: 'Uganda'
    }, {
      code: 'UA',
      name: 'Ukraine'
    }, {
      code: 'AE',
      name: 'United Arab Emirates'
    }, {
      code: 'GB',
      name: 'United Kingdom'
    }, {
      code: 'UM',
      name: 'United States Minor Outlying Islands'
    }, {
      code: 'US',
      name: 'United States of America'
    }, {
      code: 'UY',
      name: 'Uruguay'
    }, {
      code: 'UZ',
      name: 'Uzbekistan'
    }, {
      code: 'VU',
      name: 'Vanuatu'
    }, {
      code: 'VA',
      name: 'Vatican City'
    }, {
      code: 'VE',
      name: 'Venezuela'
    }, {
      code: 'VN',
      name: 'Vietnam'
    }, {
      code: 'VI',
      name: 'Virgin Islands of the United States'
    }, {
      code: 'WF',
      name: 'Wallis and Futuna'
    }, {
      code: 'EH',
      name: 'Western Sahara'
    }, {
      code: 'YE',
      name: 'Yemen'
    }, {
      code: 'ZM',
      name: 'Zambia'
    }, {
      code: 'ZW',
      name: 'Zimbabwe'
    }, {
      code: 'AX',
      name: 'Åland Islands'
    }
  ];

  rsubmitbuttonloading = false;
  rshowsubmitstatus = false;
  rsubmissionstatusstring = "";

  wsubmitbuttonloading = false;
  wshowsubmitstatus = false;
  wsubmissionstatusstring = "";


  constructor(public regservice: ProductregistrationService) {

    this.regservice.registerform.patchValue({rfilepath: null});
    this.regservice.rimgabspath = "";
    this.regservice.rimgdata = "";

    this.regservice.warrantyform.patchValue({wreceiptfilepath: null});
    this.regservice.warrantyform.patchValue({wserialnumberfilepath: null});
    this.regservice.wreceiptimgdata = "";
    this.regservice.wserialnumberimgdata = "";
    
    
    this.regservice.rimgabspath = "";
    this.regservice.rimgdata = "";
    
    
   }

   ngOnInit() {

    this.SetInitStatus();
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.regservice.rimgdata = btoa(binaryString);
    console.log(this.regservice.rimgdata);
   }

   uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
        this.regservice.registerform.patchValue({rfilepath: ""});
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.regservice.registerform.patchValue({rfilepath: file.name});
      
        this.regservice.rimgabspath = imgFile.target.result;

        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(imgFile.target.files[0]);
         



      });
                
      }
  }


  ////

  _handleWSerialReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.regservice.wserialnumberimgdata = btoa(binaryString);
    console.log(this.regservice.wserialnumberimgdata);
   }

   uploadWSerialFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
        this.regservice.warrantyform.patchValue({wserialnumberfilepath: ""});
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.regservice.warrantyform.patchValue({wserialnumberfilepath: file.name});
      
        this.regservice.wserialnumberimgabspath = imgFile.target.result;

        var reader = new FileReader();
        reader.onload = this._handleWSerialReaderLoaded.bind(this);

        reader.readAsBinaryString(imgFile.target.files[0]);
        
      });
                
      }
  }

  ////


  ////

  _handleWReceiptReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.regservice.wreceiptimgdata = btoa(binaryString);
    console.log(this.regservice.wreceiptimgdata);
   }

   uploadWReceiptFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
        this.regservice.warrantyform.patchValue({wreceiptfilepath: ""});
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.regservice.warrantyform.patchValue({wreceiptfilepath: file.name});
      
        this.regservice.wreceiptimgabspath = imgFile.target.result;

        var reader = new FileReader();
        reader.onload = this._handleWReceiptReaderLoaded.bind(this);

        reader.readAsBinaryString(imgFile.target.files[0]);
        
      });
                
      }
  }

  ////

SetInitStatus(): void{

  this.rsubmitbuttonloading = false;
  this.rshowsubmitstatus = false;
  this.rsubmissionstatusstring = "";


  this.wsubmitbuttonloading = false;
  this.wshowsubmitstatus = false;
  this.wsubmissionstatusstring = "";


    
}

SetSubmittingStatus(message: string): void{

  this.rsubmitbuttonloading = true;
  this.rshowsubmitstatus = true;
  this.rsubmissionstatusstring = message;
    
}

SetSubmissionSuccessStatus(message: string): void{
  this.rsubmissionstatusstring = message;
    this.rsubmitbuttonloading = false;
    this.rshowsubmitstatus = true;
}


SetSubmissionFailureStatus(message:string): void{
  this.rsubmissionstatusstring = message;
    this.rsubmitbuttonloading = false;
    this.rshowsubmitstatus = true;
}


////////////////////////////////
SetWSubmittingStatus(message: string): void{

  this.wsubmitbuttonloading = true;
  this.wshowsubmitstatus = true;
  this.wsubmissionstatusstring = message;
    
}

SetWSubmissionSuccessStatus(message: string): void{
  this.wsubmissionstatusstring = message;
    this.wsubmitbuttonloading = false;
    this.wshowsubmitstatus = true;
}


SetWSubmissionFailureStatus(message:string): void{
  this.wsubmissionstatusstring = message;
    this.wsubmitbuttonloading = false;
    this.wshowsubmitstatus = true;
}
////////////////////////////////

UploadWarrantyClaim()
{
    //this.SetSubmissionSuccessStatus();
    if (this.regservice.warrantyform.invalid)
    {
        this.SetWSubmissionFailureStatus("Please check the warranty information entered above. Some of it is invalid.")
        return;
    }

    this.SetWSubmittingStatus("Submitting your warranty claim...Checking if the serial number is valid...");
    debugger;
    this.regservice.postwarrantydetail().subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.SetWSubmissionSuccessStatus("Congratulations!! Your MyMy warranty claim has been successfully submitted. Please make sure you have received the confirmation email of your warranty submission. If not please contact us at contact@mymyvape.com.");
              }
              else if (result1 === 'Invalid ProductId')
              {
                this.SetWSubmissionFailureStatus("Our apologies. We could not validate your product serial number. Please verify that the serial number entered is correct. Please email us at contact@mymyvape.com if the issue persists.");
              }
              else
              {
                this.SetWSubmissionFailureStatus("Our apologies. We could not receive your Warranty claim submission. Please email us at contact@mymyvape.com regarding this issue.");
              }
          
      },
      err => {
          this.SetWSubmissionFailureStatus("Our apologies. We could not receive your Warranty claim submission. Please email us at contact@mymyvape.com regarding this issue.");
      }
    );

}


UploadRegistration()
{
    //this.SetSubmissionSuccessStatus();
    if (this.regservice.registerform.invalid)
    {
        this.SetSubmissionFailureStatus("Please check the registration information entered above. Some of it is invalid.")
        return;
    }

    this.SetSubmittingStatus("Submitting your registration...Checking if the serial number is valid...");
    debugger;
    this.regservice.postregistrationdetail().subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.SetSubmissionSuccessStatus("Congratulations!! Your MyMy product has been successfully registered. Please make sure you have received the confirmation email of your product registration. If not please contact us at contact@mymyvape.com.");
              }
              else if (result1 === 'Invalid ProductId')
              {
                this.SetSubmissionFailureStatus("Our apologies. We could not validate your product serial number. Please verify that the serial number entered is correct. Please email us at contact@mymyvape.com if the issue persists.");
              }
              else
              {
                console.log(res);
                this.SetSubmissionFailureStatus("Our apologies. We could not register your product. Please email us at contact@mymyvape.com regarding this issue.");
              }
          
      },
      err => {
        console.log(err);
          this.SetSubmissionFailureStatus("Our apologies. We could not register your product. Please email us at contact@mymyvape.com regarding this issue.");
      }
    );

}

}
