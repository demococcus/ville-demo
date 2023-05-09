
import { PermitService } from "./permit.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from "src/environments/environment";
import { getMockPermit, getMockPermitsList } from "test-tools/db-data";
import { Permit } from "./models/permit.model";
import { HttpErrorResponse } from "@angular/common/http";


describe("PermitService", () => {

    let permitService: PermitService;
    let httpTestingController: HttpTestingController;
    let mockPermit: Permit;
    let mockPermitList: Permit[];


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PermitService]
        });

        permitService = TestBed.inject(PermitService);
        httpTestingController = TestBed.inject(HttpTestingController);
        mockPermit = getMockPermit();
        mockPermitList = getMockPermitsList();
    });


    it('should retrieve all permits', () => {
        permitService.getPermitsList()
        .subscribe(permits => {
            
            expect(permits).withContext('No permits returned').toBeTruthy();

            expect(permits.length).withContext('Incorrect number of permits').toBe(3);

            
            const permit = permits[0];    // get the first item
            expect(permit._id).toBe('3') 
            // FIXME expect(permit.dateCreated).toBe("2023-04-09")
            expect(permit.status).toBe(2)

        });

    const req = httpTestingController.expectOne(`${environment.urlAPI}permits`);

    expect(req.request.method).toEqual("GET");

    // this is what the server returns
    req.flush(mockPermitList); 

    });

    it('should retrieve a permit by id', () => {
        permitService.getPermit('3')
        .subscribe(value => {
            
            expect(value).withContext('No permits returned').toBeTruthy();
            expect(value._id).toBe('3');
            expect(value.companyName).toBe("Crémerie Bronx");
        });

    const req = httpTestingController.expectOne(`${environment.urlAPI}permit/3`);

    expect(req.request.method).toEqual("GET");

    // this is what the server returns
    req.flush(mockPermit);  

    });

    it('should PUT permit a permit', () => {

        const permit = mockPermit;
        const changes: Partial<Permit> = {_id: permit._id, companyName: 'Test Company X'};
        const updated_permit = {...permit, changes} 
        
        permitService.savePermit(changes)
        .subscribe(value => {            
            // this is what the incoming response should be
            expect(value).withContext('No permits returned').toBeTruthy();
            expect(value._id).toBe(permit._id);
        });

        const req = httpTestingController.expectOne(`${environment.urlAPI}permit/${changes._id}`);

        // this is what the outgoing request should be
        expect(req.request.method).toEqual("PUT");        
        expect(req.request.body.companyName).toEqual(changes.companyName);

        // this is what the server returns
        req.flush(updated_permit);

    });

    it('should POST permit a permit', () => {

        const permit = mockPermit;
        const new_permit = { ...permit };
        new_permit._id = null;
        
        permitService.savePermit(new_permit)
        .subscribe(value => {            
            // this is what the incoming response should be
            expect(value).withContext('No permits returned').toBeTruthy();
            expect(value._id).toBe(permit._id);          
        });

        const req = httpTestingController.expectOne(`${environment.urlAPI}permit`);

        // this is what the outgoing request should be
        expect(req.request.method).toEqual("POST");        
        expect(req.request.body.companyName).toEqual(new_permit.companyName);

        // this is what the server returns
        req.flush(permit);

    });

    it('should give an error if PUT permit fails', () => {

        const permit = mockPermit;
        const changes: Partial<Permit> = {_id: permit._id, companyName: 'Test Company X'};
        const updated_permit = {...permit, changes} 
        
        permitService.savePermit(changes)
        .subscribe({
            next: () => { fail("the PUT permit should have failed")},
        
            error: (error: HttpErrorResponse) => {
                expect(error.status).toBe(500);
            }
        });

        const req = httpTestingController.expectOne(`${environment.urlAPI}permit/${changes._id}`);

        // this is what the outgoing request should be
        expect(req.request.method).toEqual("PUT");        

        // this is what the server returns
        req.flush('Save permit failed', {
            status: 500,
            statusText: 'Internal Server Error'
        });

    });

    it('should set and get the private property', () => {
        permitService.selectedPermitId = '1';
        expect(permitService.selectedPermitId).toEqual('1');
      });


    afterEach(() => {
        httpTestingController.verify();     // verify that the specified (expectOne) number of requests were made
    });

});