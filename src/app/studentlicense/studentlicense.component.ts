import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { StudentLicenseService } from '../shared/services/StudentLicenseService.service';
import { HttpResponse } from '@angular/common/http';
import { StudentLicense } from '../shared/models/StudentLicense';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

export interface Countries {
  code: string
  code3: string
  name: string
  number: string
}
export interface Institutes {
  code: string
  name: string
}
export var countries: Countries[] = [
  { code: "AF", code3: "AFG", name: "Afghanistan", number: "004" },
  { code: "AL", code3: "ALB", name: "Albania", number: "008" },
  { code: "DZ", code3: "DZA", name: "Algeria", number: "012" },
  { code: "AS", code3: "ASM", name: "American Samoa", number: "016" },
  { code: "AD", code3: "AND", name: "Andorra", number: "020" },
  { code: "AO", code3: "AGO", name: "Angola", number: "024" },
  { code: "AI", code3: "AIA", name: "Anguilla", number: "660" },
  { code: "AQ", code3: "ATA", name: "Antarctica", number: "010" },
  { code: "AG", code3: "ATG", name: "Antigua and Barbuda", number: "028" },
  { code: "AR", code3: "ARG", name: "Argentina", number: "032" },
  { code: "AM", code3: "ARM", name: "Armenia", number: "051" },
  { code: "AW", code3: "ABW", name: "Aruba", number: "533" },
  { code: "AU", code3: "AUS", name: "Australia", number: "036" },
  { code: "AT", code3: "AUT", name: "Austria", number: "040" },
  { code: "AZ", code3: "AZE", name: "Azerbaijan", number: "031" },
  { code: "BS", code3: "BHS", name: "Bahamas (the)", number: "044" },
  { code: "BH", code3: "BHR", name: "Bahrain", number: "048" },
  { code: "BD", code3: "BGD", name: "Bangladesh", number: "050" },
  { code: "BB", code3: "BRB", name: "Barbados", number: "052" },
  { code: "BY", code3: "BLR", name: "Belarus", number: "112" },
  { code: "BE", code3: "BEL", name: "Belgium", number: "056" },
  { code: "BZ", code3: "BLZ", name: "Belize", number: "084" },
  { code: "BJ", code3: "BEN", name: "Benin", number: "204" },
  { code: "BM", code3: "BMU", name: "Bermuda", number: "060" },
  { code: "BT", code3: "BTN", name: "Bhutan", number: "064" },
  { code: "BO", code3: "BOL", name: "Bolivia (Plurinational State of)", number: "068" },
  { code: "BQ", code3: "BES", name: "Bonaire, Sint Eustatius and Saba", number: "535" },
  { code: "BA", code3: "BIH", name: "Bosnia and Herzegovina", number: "070" },
  { code: "BW", code3: "BWA", name: "Botswana", number: "072" },
  { code: "BV", code3: "BVT", name: "Bouvet Island", number: "074" },
  { code: "BR", code3: "BRA", name: "Brazil", number: "076" },
  { code: "IO", code3: "IOT", name: "British Indian Ocean Territory (the)", number: "086" },
  { code: "BN", code3: "BRN", name: "Brunei Darussalam", number: "096" },
  { code: "BG", code3: "BGR", name: "Bulgaria", number: "100" },
  { code: "BF", code3: "BFA", name: "Burkina Faso", number: "854" },
  { code: "BI", code3: "BDI", name: "Burundi", number: "108" },
  { code: "CV", code3: "CPV", name: "Cabo Verde", number: "132" },
  { code: "KH", code3: "KHM", name: "Cambodia", number: "116" },
  { code: "CM", code3: "CMR", name: "Cameroon", number: "120" },
  { code: "CA", code3: "CAN", name: "Canada", number: "124" },
  { code: "KY", code3: "CYM", name: "Cayman Islands (the)", number: "136" },
  { code: "CF", code3: "CAF", name: "Central African Republic (the)", number: "140" },
  { code: "TD", code3: "TCD", name: "Chad", number: "148" },
  { code: "CL", code3: "CHL", name: "Chile", number: "152" },
  { code: "CN", code3: "CHN", name: "China", number: "156" },
  { code: "CX", code3: "CXR", name: "Christmas Island", number: "162" },
  { code: "CC", code3: "CCK", name: "Cocos (Keeling) Islands (the)", number: "166" },
  { code: "CO", code3: "COL", name: "Colombia", number: "170" },
  { code: "KM", code3: "COM", name: "Comoros (the)", number: "174" },
  { code: "CD", code3: "COD", name: "Congo (the Democratic Republic of the)", number: "180" },
  { code: "CG", code3: "COG", name: "Congo (the)", number: "178" },
  { code: "CK", code3: "COK", name: "Cook Islands (the)", number: "184" },
  { code: "CR", code3: "CRI", name: "Costa Rica", number: "188" },
  { code: "HR", code3: "HRV", name: "Croatia", number: "191" },
  { code: "CU", code3: "CUB", name: "Cuba", number: "192" },
  { code: "CW", code3: "CUW", name: "Curaçao", number: "531" },
  { code: "CY", code3: "CYP", name: "Cyprus", number: "196" },
  { code: "CZ", code3: "CZE", name: "Czechia", number: "203" },
  { code: "CI", code3: "CIV", name: "Côte d'Ivoire", number: "384" },
  { code: "DK", code3: "DNK", name: "Denmark", number: "208" },
  { code: "DJ", code3: "DJI", name: "Djibouti", number: "262" },
  { code: "DM", code3: "DMA", name: "Dominica", number: "212" },
  { code: "DO", code3: "DOM", name: "Dominican Republic (the)", number: "214" },
  { code: "EC", code3: "ECU", name: "Ecuador", number: "218" },
  { code: "EG", code3: "EGY", name: "Egypt", number: "818" },
  { code: "SV", code3: "SLV", name: "El Salvador", number: "222" },
  { code: "GQ", code3: "GNQ", name: "Equatorial Guinea", number: "226" },
  { code: "ER", code3: "ERI", name: "Eritrea", number: "232" },
  { code: "EE", code3: "EST", name: "Estonia", number: "233" },
  { code: "SZ", code3: "SWZ", name: "Eswatini", number: "748" },
  { code: "ET", code3: "ETH", name: "Ethiopia", number: "231" },
  { code: "FK", code3: "FLK", name: "Falkland Islands (the) [Malvinas]", number: "238" },
  { code: "FO", code3: "FRO", name: "Faroe Islands (the)", number: "234" },
  { code: "FJ", code3: "FJI", name: "Fiji", number: "242" },
  { code: "FI", code3: "FIN", name: "Finland", number: "246" },
  { code: "FR", code3: "FRA", name: "France", number: "250" },
  { code: "GF", code3: "GUF", name: "French Guiana", number: "254" },
  { code: "PF", code3: "PYF", name: "French Polynesia", number: "258" },
  { code: "TF", code3: "ATF", name: "French Southern Territories (the)", number: "260" },
  { code: "GA", code3: "GAB", name: "Gabon", number: "266" },
  { code: "GM", code3: "GMB", name: "Gambia (the)", number: "270" },
  { code: "GE", code3: "GEO", name: "Georgia", number: "268" },
  { code: "DE", code3: "DEU", name: "Germany", number: "276" },
  { code: "GH", code3: "GHA", name: "Ghana", number: "288" },
  { code: "GI", code3: "GIB", name: "Gibraltar", number: "292" },
  { code: "GR", code3: "GRC", name: "Greece", number: "300" },
  { code: "GL", code3: "GRL", name: "Greenland", number: "304" },
  { code: "GD", code3: "GRD", name: "Grenada", number: "308" },
  { code: "GP", code3: "GLP", name: "Guadeloupe", number: "312" },
  { code: "GU", code3: "GUM", name: "Guam", number: "316" },
  { code: "GT", code3: "GTM", name: "Guatemala", number: "320" },
  { code: "GG", code3: "GGY", name: "Guernsey", number: "831" },
  { code: "GN", code3: "GIN", name: "Guinea", number: "324" },
  { code: "GW", code3: "GNB", name: "Guinea-Bissau", number: "624" },
  { code: "GY", code3: "GUY", name: "Guyana", number: "328" },
  { code: "HT", code3: "HTI", name: "Haiti", number: "332" },
  { code: "HM", code3: "HMD", name: "Heard Island and McDonald Islands", number: "334" },
  { code: "VA", code3: "VAT", name: "Holy See (the)", number: "336" },
  { code: "HN", code3: "HND", name: "Honduras", number: "340" },
  { code: "HK", code3: "HKG", name: "Hong Kong", number: "344" },
  { code: "HU", code3: "HUN", name: "Hungary", number: "348" },
  { code: "IS", code3: "ISL", name: "Iceland", number: "352" },
  { code: "IN", code3: "IND", name: "India", number: "356" },
  { code: "ID", code3: "IDN", name: "Indonesia", number: "360" },
  { code: "IR", code3: "IRN", name: "Iran (Islamic Republic of)", number: "364" },
  { code: "IQ", code3: "IRQ", name: "Iraq", number: "368" },
  { code: "IE", code3: "IRL", name: "Ireland", number: "372" },
  { code: "IM", code3: "IMN", name: "Isle of Man", number: "833" },
  { code: "IL", code3: "ISR", name: "Israel", number: "376" },
  { code: "IT", code3: "ITA", name: "Italy", number: "380" },
  { code: "JM", code3: "JAM", name: "Jamaica", number: "388" },
  { code: "JP", code3: "JPN", name: "Japan", number: "392" },
  { code: "JE", code3: "JEY", name: "Jersey", number: "832" },
  { code: "JO", code3: "JOR", name: "Jordan", number: "400" },
  { code: "KZ", code3: "KAZ", name: "Kazakhstan", number: "398" },
  { code: "KE", code3: "KEN", name: "Kenya", number: "404" },
  { code: "KI", code3: "KIR", name: "Kiribati", number: "296" },
  { code: "KP", code3: "PRK", name: "Korea (the Democratic People's Republic of)", number: "408" },
  { code: "KR", code3: "KOR", name: "Korea (the Republic of)", number: "410" },
  { code: "KW", code3: "KWT", name: "Kuwait", number: "414" },
  { code: "KG", code3: "KGZ", name: "Kyrgyzstan", number: "417" },
  { code: "LA", code3: "LAO", name: "Lao People's Democratic Republic (the)", number: "418" },
  { code: "LV", code3: "LVA", name: "Latvia", number: "428" },
  { code: "LB", code3: "LBN", name: "Lebanon", number: "422" },
  { code: "LS", code3: "LSO", name: "Lesotho", number: "426" },
  { code: "LR", code3: "LBR", name: "Liberia", number: "430" },
  { code: "LY", code3: "LBY", name: "Libya", number: "434" },
  { code: "LI", code3: "LIE", name: "Liechtenstein", number: "438" },
  { code: "LT", code3: "LTU", name: "Lithuania", number: "440" },
  { code: "LU", code3: "LUX", name: "Luxembourg", number: "442" },
  { code: "MO", code3: "MAC", name: "Macao", number: "446" },
  { code: "MG", code3: "MDG", name: "Madagascar", number: "450" },
  { code: "MW", code3: "MWI", name: "Malawi", number: "454" },
  { code: "MY", code3: "MYS", name: "Malaysia", number: "458" },
  { code: "MV", code3: "MDV", name: "Maldives", number: "462" },
  { code: "ML", code3: "MLI", name: "Mali", number: "466" },
  { code: "MT", code3: "MLT", name: "Malta", number: "470" },
  { code: "MH", code3: "MHL", name: "Marshall Islands (the)", number: "584" },
  { code: "MQ", code3: "MTQ", name: "Martinique", number: "474" },
  { code: "MR", code3: "MRT", name: "Mauritania", number: "478" },
  { code: "MU", code3: "MUS", name: "Mauritius", number: "480" },
  { code: "YT", code3: "MYT", name: "Mayotte", number: "175" },
  { code: "MX", code3: "MEX", name: "Mexico", number: "484" },
  { code: "FM", code3: "FSM", name: "Micronesia (Federated States of)", number: "583" },
  { code: "MD", code3: "MDA", name: "Moldova (the Republic of)", number: "498" },
  { code: "MC", code3: "MCO", name: "Monaco", number: "492" },
  { code: "MN", code3: "MNG", name: "Mongolia", number: "496" },
  { code: "ME", code3: "MNE", name: "Montenegro", number: "499" },
  { code: "MS", code3: "MSR", name: "Montserrat", number: "500" },
  { code: "MA", code3: "MAR", name: "Morocco", number: "504" },
  { code: "MZ", code3: "MOZ", name: "Mozambique", number: "508" },
  { code: "MM", code3: "MMR", name: "Myanmar", number: "104" },
  { code: "NA", code3: "NAM", name: "Namibia", number: "516" },
  { code: "NR", code3: "NRU", name: "Nauru", number: "520" },
  { code: "NP", code3: "NPL", name: "Nepal", number: "524" },
  { code: "NL", code3: "NLD", name: "Netherlands (the)", number: "528" },
  { code: "NC", code3: "NCL", name: "New Caledonia", number: "540" },
  { code: "NZ", code3: "NZL", name: "New Zealand", number: "554" },
  { code: "NI", code3: "NIC", name: "Nicaragua", number: "558" },
  { code: "NE", code3: "NER", name: "Niger (the)", number: "562" },
  { code: "NG", code3: "NGA", name: "Nigeria", number: "566" },
  { code: "NU", code3: "NIU", name: "Niue", number: "570" },
  { code: "NF", code3: "NFK", name: "Norfolk Island", number: "574" },
  { code: "MP", code3: "MNP", name: "Northern Mariana Islands (the)", number: "580" },
  { code: "NO", code3: "NOR", name: "Norway", number: "578" },
  { code: "OM", code3: "OMN", name: "Oman", number: "512" },
  { code: "PK", code3: "PAK", name: "Pakistan", number: "586" },
  { code: "PW", code3: "PLW", name: "Palau", number: "585" },
  { code: "PS", code3: "PSE", name: "Palestine, State of", number: "275" },
  { code: "PA", code3: "PAN", name: "Panama", number: "591" },
  { code: "PG", code3: "PNG", name: "Papua New Guinea", number: "598" },
  { code: "PY", code3: "PRY", name: "Paraguay", number: "600" },
  { code: "PE", code3: "PER", name: "Peru", number: "604" },
  { code: "PH", code3: "PHL", name: "Philippines (the)", number: "608" },
  { code: "PN", code3: "PCN", name: "Pitcairn", number: "612" },
  { code: "PL", code3: "POL", name: "Poland", number: "616" },
  { code: "PT", code3: "PRT", name: "Portugal", number: "620" },
  { code: "PR", code3: "PRI", name: "Puerto Rico", number: "630" },
  { code: "QA", code3: "QAT", name: "Qatar", number: "634" },
  { code: "MK", code3: "MKD", name: "Republic of North Macedonia", number: "807" },
  { code: "RO", code3: "ROU", name: "Romania", number: "642" },
  { code: "RU", code3: "RUS", name: "Russian Federation (the)", number: "643" },
  { code: "RW", code3: "RWA", name: "Rwanda", number: "646" },
  { code: "RE", code3: "REU", name: "Réunion", number: "638" },
  { code: "BL", code3: "BLM", name: "Saint Barthélemy", number: "652" },
  { code: "SH", code3: "SHN", name: "Saint Helena, Ascension and Tristan da Cunha", number: "654" },
  { code: "KN", code3: "KNA", name: "Saint Kitts and Nevis", number: "659" },
  { code: "LC", code3: "LCA", name: "Saint Lucia", number: "662" },
  { code: "MF", code3: "MAF", name: "Saint Martin (French part)", number: "663" },
  { code: "PM", code3: "SPM", name: "Saint Pierre and Miquelon", number: "666" },
  { code: "VC", code3: "VCT", name: "Saint Vincent and the Grenadines", number: "670" },
  { code: "WS", code3: "WSM", name: "Samoa", number: "882" },
  { code: "SM", code3: "SMR", name: "San Marino", number: "674" },
  { code: "ST", code3: "STP", name: "Sao Tome and Principe", number: "678" },
  { code: "SA", code3: "SAU", name: "Saudi Arabia", number: "682" },
  { code: "SN", code3: "SEN", name: "Senegal", number: "686" },
  { code: "RS", code3: "SRB", name: "Serbia", number: "688" },
  { code: "SC", code3: "SYC", name: "Seychelles", number: "690" },
  { code: "SL", code3: "SLE", name: "Sierra Leone", number: "694" },
  { code: "SG", code3: "SGP", name: "Singapore", number: "702" },
  { code: "SX", code3: "SXM", name: "Sint Maarten (Dutch part)", number: "534" },
  { code: "SK", code3: "SVK", name: "Slovakia", number: "703" },
  { code: "SI", code3: "SVN", name: "Slovenia", number: "705" },
  { code: "SB", code3: "SLB", name: "Solomon Islands", number: "090" },
  { code: "SO", code3: "SOM", name: "Somalia", number: "706" },
  { code: "ZA", code3: "ZAF", name: "South Africa", number: "710" },
  { code: "GS", code3: "SGS", name: "South Georgia and the South Sandwich Islands", number: "239" },
  { code: "SS", code3: "SSD", name: "South Sudan", number: "728" },
  { code: "ES", code3: "ESP", name: "Spain", number: "724" },
  { code: "LK", code3: "LKA", name: "Sri Lanka", number: "144" },
  { code: "SD", code3: "SDN", name: "Sudan (the)", number: "729" },
  { code: "SR", code3: "SUR", name: "Suriname", number: "740" },
  { code: "SJ", code3: "SJM", name: "Svalbard and Jan Mayen", number: "744" },
  { code: "SE", code3: "SWE", name: "Sweden", number: "752" },
  { code: "CH", code3: "CHE", name: "Switzerland", number: "756" },
  { code: "SY", code3: "SYR", name: "Syrian Arab Republic", number: "760" },
  { code: "TW", code3: "TWN", name: "Taiwan", number: "158" },
  { code: "TJ", code3: "TJK", name: "Tajikistan", number: "762" },
  { code: "TZ", code3: "TZA", name: "Tanzania, United Republic of", number: "834" },
  { code: "TH", code3: "THA", name: "Thailand", number: "764" },
  { code: "TL", code3: "TLS", name: "Timor-Leste", number: "626" },
  { code: "TG", code3: "TGO", name: "Togo", number: "768" },
  { code: "TK", code3: "TKL", name: "Tokelau", number: "772" },
  { code: "TO", code3: "TON", name: "Tonga", number: "776" },
  { code: "TT", code3: "TTO", name: "Trinidad and Tobago", number: "780" },
  { code: "TN", code3: "TUN", name: "Tunisia", number: "788" },
  { code: "TR", code3: "TUR", name: "Turkey", number: "792" },
  { code: "TM", code3: "TKM", name: "Turkmenistan", number: "795" },
  { code: "TC", code3: "TCA", name: "Turks and Caicos Islands (the)", number: "796" },
  { code: "TV", code3: "TUV", name: "Tuvalu", number: "798" },
  { code: "UG", code3: "UGA", name: "Uganda", number: "800" },
  { code: "UA", code3: "UKR", name: "Ukraine", number: "804" },
  { code: "AE", code3: "ARE", name: "United Arab Emirates (the)", number: "784" },
  { code: "GB", code3: "GBR", name: "United Kingdom of Great Britain and Northern Ireland (the)", number: "826" },
  { code: "UM", code3: "UMI", name: "United States Minor Outlying Islands (the)", number: "581" },
  { code: "US", code3: "USA", name: "United States of America (the)", number: "840" },
  { code: "UY", code3: "URY", name: "Uruguay", number: "858" },
  { code: "UZ", code3: "UZB", name: "Uzbekistan", number: "860" },
  { code: "VU", code3: "VUT", name: "Vanuatu", number: "548" },
  { code: "VE", code3: "VEN", name: "Venezuela (Bolivarian Republic of)", number: "862" },
  { code: "VN", code3: "VNM", name: "Viet Nam", number: "704" },
  { code: "VG", code3: "VGB", name: "Virgin Islands (British)", number: "092" },
  { code: "VI", code3: "VIR", name: "Virgin Islands (U.S.)", number: "850" },
  { code: "WF", code3: "WLF", name: "Wallis and Futuna", number: "876" },
  { code: "EH", code3: "ESH", name: "Western Sahara", number: "732" },
  { code: "YE", code3: "YEM", name: "Yemen", number: "887" },
  { code: "ZM", code3: "ZMB", name: "Zambia", number: "894" },
  { code: "ZW", code3: "ZWE", name: "Zimbabwe", number: "716" },
  { code: "AX", code3: "ALA", name: "Åland Islands", number: "248" }
];
export var institutes: Institutes[] = [
  { code: "1A", name: "Sri Lanka Institute of Information Technology" },
  { code: "2A", name: "Sri Lanka Technological Campus" },
  { code: "3A", name: "NSBM Green University" },
  { code: "4A", name: "Informatics Institute of Technology Sri Lanka" },
];


@Component({
  selector: 'app-studentlicense',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatDividerModule, MatButtonModule, MatSelectModule, ReactiveFormsModule, FormsModule, NgIf, RouterLink],
  templateUrl: './studentlicense.component.html',
  styleUrl: './studentlicense.component.scss'
})

export class StudentlicenseComponent implements OnInit {
  studentLicenseForm: FormGroup = new FormGroup({});
  selectedFile: any = null;
  countries: any = countries
  institutes: any = institutes
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private studentLicenseService: StudentLicenseService) { }

  ngOnInit(): void {
    this.studentLicenseForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.pattern("^((\\+94-?)|0)?[0-9]{9}$")]],
      address: [""],
      country: ["", [Validators.required]],
      institute: ["", [Validators.required]],
      intake: ["", [Validators.required]],
      courseTitle: ["", [Validators.required]],
      studentIdCard: ["", [Validators.required]],

    });
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size < 10485760) {
      this.studentLicenseForm.patchValue({
        studentIdCard: file
      });
    } else {
      this.studentLicenseForm.patchValue({
        studentIdCard: null
      });
      this.errorMessage = 'Please upload a valid image file (.jpg, .png) under 10 MB.';
    }

  }
  onSubmit(): void {
    this.studentLicenseService.create(this.studentLicenseForm.value).subscribe((res: HttpResponse<StudentLicense>) => {
      this.studentLicenseForm.reset()
      Swal.fire("Saved!");
    })
  }
}
