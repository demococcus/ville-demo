
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PermitModule } from '../../permit.module';
import { ReferenceCardComponent } from './reference-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ReferenceCardComponent', () => {

    let component: ReferenceCardComponent;
    let fixture: ComponentFixture<ReferenceCardComponent>;
    let el: DebugElement;

    beforeEach(async () => {  
        await TestBed.configureTestingModule({
          declarations: [ ReferenceCardComponent ],
          imports: [PermitModule]
        })
        .compileComponents();    
        fixture = TestBed.createComponent(ReferenceCardComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });

    it('should create the component', () => {
        expect(component).withContext('Component not created').toBeTruthy();
    });

    it('should display one title', () => {
        expect(component).toBeTruthy();
        
        component.title = 'Test title';
        fixture.detectChanges();        
        
        const title_list = el.queryAll(By.css(".card-title"))
        expect(title_list).withContext('Could not find the list of titles').toBeTruthy();
        expect(title_list.length).withContext('Unexpected number of titles').toBe(1);
        // console.log(title_list[0].nativeElement.outerHTML);      

    });

    it('should display specific value in the title', () => {
        component.title = 'Test title';
        fixture.detectChanges();
        const title = el.query(By.css(".card-title"));
        expect(title).withContext('Could not find title').toBeTruthy();
        expect(title.nativeElement.textContent).toBe('Test title');        
    });

    it('should have a specific url in the cardLink', () => {
        const cardLink = el.query(By.css(".card-link"));
        expect(cardLink).withContext('Could not find the cardLink').toBeTruthy();
        expect(cardLink.nativeElement.href).toBe('https://en.wikipedia.org/'); 
    });

});

