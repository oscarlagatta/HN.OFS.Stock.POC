import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Season } from '../domain/season';
import { Store } from '../domain/store';

// OFS site 
import { Site } from '../domain/site';

import { Department } from '../domain/department';
import { Brand } from '../domain/brand';
import { Rule } from '../domain/rule';
import { Profile } from '../domain/profile';

import { SelectItem } from 'primeng/primeng';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class StockBufferService {

    constructor(private http: Http) { }

    getProfiles() {
        return this.http.get('../../assets/data/profile.json')
            .toPromise()
            .then(res => <Profile[]>res.json().data)
            .then(data => {
                return data;
            });                
    }

    getRules() {
        return this.http.get('../../assets/data/rule.json')
            .toPromise()
            .then(res => <Rule[]>res.json().data)
            .then(data => {
                return data;
            });        
    }


    // CRUD 
    getSeasons() {
        return this.http.get('../../assets/data/season.json')
            .toPromise()
            .then(res => <Season[]>res.json().data)
            .then(data => {
                return data;
            });
    }
    
    // get the OFS sites 
    getSiteDropDownData() {

        return this.http.get('../../assets/data/ofs-site.json')
                .toPromise()
                .then(res => {
                    let ofsSiteDropDownData: SelectItem[] = [];

                    ofsSiteDropDownData.push( {
                        label: 'Select Site',
                        value: null
                    });  

                    ofsSiteDropDownData.push( {
                        label: 'All',
                        value: -1
                    });  

                    <Site>res.json().data.forEach( siteItem => {
                        let site: SelectItem = {
                            value: siteItem.SiteID,
                            label: siteItem.Name
                        };

                        ofsSiteDropDownData.push(site);

                    });

                    return ofsSiteDropDownData;
                });
    }

    getSeasonsDropDownData() {
        return this.http.get('../../assets/data/season.json')
            .toPromise()
            .then(res => {

                let seasonDropDownData: SelectItem[]= [];

                seasonDropDownData.push( {
                        label: 'Select Season',
                        value: null
                    });

                seasonDropDownData.push( {
                        label: 'All',
                        value: -1
                    });


                <Season[]>res.json().data.forEach(seasonItem => {
                    let season: SelectItem = {
                        label: seasonItem.SeasonName,
                        value: seasonItem.SeasonID
                    };
                    seasonDropDownData.push(season);
                });

                return seasonDropDownData;
            });
    }

    getStoreDropDownData() {
         return this.http.get('../../assets/data/site.json')
            .toPromise()
            .then(res => {

                let siteDropDownData: SelectItem[]= [];

                siteDropDownData.push( {
                        label: 'Select Site',
                        value: null
                    });

                siteDropDownData.push( {
                        label: 'All',
                        value: -1
                    });

                <Store[]>res.json().data.forEach(storeItem => {
                    let store: SelectItem = {
                        label: storeItem.SiteName,
                        value: storeItem.SiteID
                    };
                    siteDropDownData.push(store);
                });

                return siteDropDownData;
            });

    }

    getDepartmentDropDownData() {

        return this.http.get('../../assets/data/department.json')
            .toPromise()
            .then(res => {

                let departmentDropDownData: SelectItem[]= [];

                 departmentDropDownData.push( {
                        label: 'Select Department',
                        value: null
                    });

                departmentDropDownData.push( {
                        label: 'All',
                        value: -1
                    });

                <Department[]>res.json().data.forEach(departmentItem => {
                    let department: SelectItem = {
                        label: departmentItem.DeptDesc,
                        value: departmentItem.DeptID
                    };
                    departmentDropDownData.push(department);
                });

                return departmentDropDownData;
            });
    }

    getBrandDropDownData() {
        return this.http.get('../../assets/data/brand.json')
            .toPromise()
            .then(res => {

                let brandDropDownData: SelectItem[]= [];
                
                brandDropDownData.push( {
                        label: 'Select Brand',
                        value: null
                    });
                
                brandDropDownData.push( {
                        label: 'All',
                        value: -1
                    });

                <Brand[]>res.json().data.forEach(brandItem => {
                    let brand: SelectItem = {
                        label: brandItem.BrandDesc,
                        value: brandItem.BrandID
                    };
                    brandDropDownData.push(brand);
                });

                return brandDropDownData;
            });
    }

    getProfilesDropDownData(){
        return this.http.get('../../assets/data/profile.json')
            .toPromise()
            .then(res => {

                let profileDropDownData: SelectItem[]= [];
                
                profileDropDownData.push( {
                        label: 'Select Profile',
                        value: null
                    });

                <Profile[]>res.json().data.forEach(profileItem => {
                    let brand: SelectItem = {
                        label: profileItem.ProfileName,
                        value: profileItem.ProfileID
                    };
                    profileDropDownData.push(brand);
                });

                return profileDropDownData;
            });
    }
}