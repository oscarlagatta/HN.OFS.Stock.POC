import { Component, OnInit, ViewChild } from '@angular/core';
import { StockBufferService } from './service/stock-buffer.service';
import { SelectItem, ButtonModule, 
         InputTextModule, 
         ConfirmDialogModule, 
         GrowlModule,
         ConfirmationService, 
         Message,
         MultiSelectModule,
         PanelModule,
         TooltipModule,
         TabView,
         TabPanel,
         Checkbox } from 'primeng/primeng';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

 @ViewChild(TabView) tabView: TabView;

  // Rules related
  displayRuleDialog: boolean;
  rule: Rule = new Rule();
  selectedRule: Rule;
  newRule: boolean;
  rules: Rule[];

  // Season related
  displaySeasonDialog: boolean;
  season: Season = new Season();
  selectedSeason: string;
  newSeason: boolean;
  seasons: Season[];


  displayHelpDialog: boolean;

  selectedSite: string;
  selectedDepartment: string;
  selectedBrand: string;

  selectedProfile: string;
  
  // Drop Downs data arrays of type PrimeNG SelectItem
  seasonDropDownData: SelectItem[];
  storeDropDownData: SelectItem[];
  departmentDropDownData: SelectItem[];
  brandDropDownData: SelectItem[];

  // OFS Sites
  siteDropDownData: SelectItem[];

  profileDropDownData: SelectItem[];  
  profiles: Profile[] ;

  msgs: Message[] = [];


  // Selected Profile
  selectedProfileID: string = "";
  selectedProfileName: string = "";
  selectedProfileDate: string = "";

  constructor(private stockBufferService: StockBufferService,
              private confirmationService: ConfirmationService) {


    // get profiles data for dropdown
    this.stockBufferService.getProfilesDropDownData()
      .then(profiles => this.profileDropDownData = profiles);

    // get seasons data for dropdown
    this.stockBufferService.getSeasonsDropDownData()
      .then(seasons => this.seasonDropDownData = seasons);

    // get store data for dropdown
    this.stockBufferService.getStoreDropDownData()
      .then(stores => this.storeDropDownData = stores);

    // get department data for dropdown
    this.stockBufferService.getDepartmentDropDownData()
      .then(departments => this.departmentDropDownData = departments);

    // get brand data for dropdown
    this.stockBufferService.getBrandDropDownData()
      .then(brands => this.brandDropDownData = brands);

    this.stockBufferService.getSiteDropDownData()
      .then(sites => this.siteDropDownData = sites);

  }

  ngOnInit() {

    // get profiles data 
    this.stockBufferService.getProfiles()
      .then(profiles => this.profiles = profiles);

    // get rules for rules grid
    this.getAllRules();

    // get seasons for seasons grid
    this.stockBufferService.getSeasons()
      .then(seasons => this.seasons = seasons);
  }
 
  private getAllRules() {
     // get rules for rules grid
    this.stockBufferService.getRules()
      .then(rules => this.rules = rules);
  }
 

  //function
  // change the current tab to a selected one
  selectTab(idx): void {
      for(let t of this.tabView.tabs){
            if (t.selected)
                  t.selected = false;
      }
      this.tabView.tabs[idx].selected = true;
    
  }
  

  /**
   * Checks what tab has been selected
   * and loads the rules again or 
   * filter based on the one selected
   * @param event 
   */
  handleProfileTabChange(event) {

    const index = event.index;

    // if first tab selected load the rules again
    if(index == 0) {
        // get rules for rules grid
        this.getAllRules();
    } else if( index == 1) // Stock Buffer rules tab
    {
       this.rules = this.rules
                    .filter( p => p.ProfileID == this.selectedProfileID);
    }
  }


  // RULE
  // --------------------------------------------------

  /**
   * Display Add New Rule Dialog Box
   */
  showDialogRuleToAdd() {
    this.newRule = true;
    this.rule = new Rule();
    this.selectedSeason = null;
    this.selectedSite = null;
    this.selectedDepartment = null;
    this.selectedBrand = null;
    
    this.selectedProfile = null;

    // display NgPrime dialog box 
    this.displayRuleDialog = true;
  }


  help() {
    this.displayHelpDialog = true;
  }

  /**
   * Save/Update rule data
   */
  saveRule() {
    if (this.newRule) {
      this.rules.push(this.rule);
    }
    else {
      this.rules[this.findSelectedRuleIndex()] = this.rule;
    }

    this.rule = null;
    // dismiss the dialog box
    this.displayRuleDialog = false;
  }

  /**
   * Deletes selected rule
   */
  deleteRule() {
    this.rules.splice(this.findSelectedRuleIndex(), 1);
    this.rule = null;
    this.displayRuleDialog = false;
  }

  /**
   * User clicked the rule in the grid
   * @param event 
   */
  onRowSelectedRule(event) {
    this.newRule = false;
    console.log('Event Data',event.data);
    
    this.rule = this.cloneRule(event.data);
    this.displayRuleDialog = true;
  }


 /**
  * 
  * @param event 
  */
  onRowSelectedProfile(event){

      this.selectTab(1);
      
      console.log(event.data);
      

      this.selectedProfileID = event.data.ProfileID;
      this.selectedProfileName = event.data.ProfileName;
      this.selectedProfileDate = event.data.ProfileDate;

      this.rules = this.rules
                    .filter( p => p.ProfileID == this.selectedProfileID);

  }

  /**
   * Get a copy of the selected rule
   * to display on the Dialog box
   * @param r Rule 
   */
  cloneRule(r: Rule): Rule {
    let rule = new Rule();
    for (let prop in r) {

      switch (prop) {
        case 'SeasonID': {
          this.selectedSeason = r[prop];
          break;
        }
        case 'SiteID':
          this.selectedSite = r[prop];
          break;
        case 'DeptID':
          this.selectedDepartment = r[prop];
          break;
        case 'BrandID':
          this.selectedBrand = r[prop];
          break;
        case 'ProfileID':
          this.selectedProfile = r[prop];
          break;
        default:
          break;
      }
     
      rule[prop] = r[prop];
    }

    return rule;
  }

  /**
   * Confirm Rule message for p-confirm dialog box
   */
  confirm() {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to apply changes?',
          header: 'Update Rule',
          icon: 'fa fa-info-circle',
          accept: () => {
             this.msgs = [];

             this.saveRule();
             
             this.msgs.push({severity:'success', summary:'Rule Updated', detail:'Rule changes have been applied'});
          }
      });
  }

  /**
   * Delete Rule Confirm message 
   * for p-confirm dialog box
   */
  confirmDelete() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this rule?',
            header: 'Delete Rule',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [];

                this.deleteRule();
                
                this.msgs.push({severity:'info', summary:'Rule Deleted', detail:'Rule has been deleted'});
            }
        });
    }
  
  /**
   * Drop down Season updates the data after 
   * they selected a new season from the list
   * @param event 
   */
  onChange_Season(event) {
      //console.log(event);
      let seasonSelected = this.seasonDropDownData.find(season => season.value == event.value);
      this.rule.SeasonName = seasonSelected.label;
      this.rule.SeasonID = seasonSelected.value;
  }
  
  /**
   * Drop down Sites updates the data after
   * they selected a new site from the list
   * @param event 
   */
  onChange_Site(event) {
      //let storeSelected = this.storeDropDownData.find(store => store.value == event.value);
      let siteSelected = this.siteDropDownData.find(site => site.value == event.value);
      this.rule.SiteName = siteSelected.label;
      this.rule.SiteID = siteSelected.value;
  }

  /**
   * Drop down Department updates the data after
   * they selected a new department from the list
   * @param event 
   */
  onChange_Department(event) {
      let departmentSelected = this.departmentDropDownData.find(department => department.value == event.value);
      this.rule.DeptDesc = departmentSelected.label;
      this.rule.DeptID = departmentSelected.value;
  }

  onChange_Brand(event) {
      let brandSelected = this.brandDropDownData.find(brand => brand.value == event.value);
      this.rule.BrandDesc = brandSelected.label;
      this.rule.BrandID = brandSelected.value;
  }

  onChange_Profile(event) {
      let profileSelected = this.profileDropDownData.find(profile => profile.value == event.value);
      this.rule.ProfileName = profileSelected.label;
      this.rule.ProfileID = profileSelected.value;
  }

  // SEASON 
  // --------------------------------------------------

  // Display Add New Season Dialog Box
  showDialogSeasonToAdd() {
    this.newSeason = true;
    this.season = new Season();
    this.displaySeasonDialog = true;
  }

  // Save/Update season data
  saveSeason() {
    if (this.newSeason)
      this.seasons.push(this.season);
    else
      this.seasons[this.findSelectedSeasonIndex()] = this.season;

    this.season = null;

    // dismiss the dialog box
    this.displaySeasonDialog = false;

  }

  deleteSeason() {
    this.seasons.splice(this.findSelectedSeasonIndex(), 1);
    this.season = null;
    this.displaySeasonDialog = false;
  }

  onRowSelectSeason(event) {
    this.newSeason = false;
    this.season = this.cloneSeason(event.data);
    this.displaySeasonDialog = true;
  }

  cloneSeason(c: Season): Season {
    let season = new Season();
    for (let prop in c) {
      season[prop] = c[prop];
    }
    return season;
  }


  findSelectedRuleIndex(): number {
    return this.rules.indexOf(this.selectedRule);
  }

  findSelectedSeasonIndex(): number {
    return this.seasons.indexOf(this.selectedSeason);
  }
}


export class Profile {

  constructor(public ProfileID?,
    public ProfileDate?,
    public ProfileName?,
    public ProfileActive?) {
  }
}

export class Season {

  constructor(public seasonId?,
    public seasonName?,
    public mSeasonCode?,
    public defaultExchangeRateGroup?) {
  }
}

export class Store {
  constructor(public siteID?,
    public siteName?,
    public siteAvailable?,
    public shortDescription?,
    public deliveryLocation?,
    public siteType?,
    public mSiteID?) {
  }
}

export class Rule {
  constructor(public SeasonID?,
    public SeasonName?,
    public SiteID?,
    public SiteName?,
    public DeptID?,
    public DeptDesc?,
    public BrandID?,
    public BrandDesc?,
    public ProfileID?,
    public ProfileName?,
    public Buffer?) {
  }
}


