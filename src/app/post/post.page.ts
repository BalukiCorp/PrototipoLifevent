import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../services/user.service'
import { firestore } from 'firebase/app'
import { NavController } from '@ionic/angular';

@Component({
selector: 'app-post',
templateUrl: './post.page.html',
styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

postID: string;
effect = '';
post;
postReference: AngularFirestoreDocument;
sub;

heartType: string = "heart-empty"

constructor(
	private route: ActivatedRoute, 
	private afs: AngularFirestore,
	public navCtrl: NavController,
	private user: UserService) {

}

ngOnInit() {
this.postID = this.route.snapshot.paramMap.get('id')
this.postReference = this.afs.doc(`posts/${this.postID}`)
this.sub = this.postReference.valueChanges().subscribe(val => {
	this.post = val;
	this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
 })
console.log(this.postID);
}

ngOnDestroy() {
	this.sub.unsubscribe()
}

toggleHeart() {
	if(this.heartType == 'heart-empty') {
		this.postReference.update({
			likes: firestore.FieldValue.arrayUnion(this.user.getUID())
		})
	} else {
		this.postReference.update({
			likes: firestore.FieldValue.arrayRemove(this.user.getUID())
		})
	}
}

regresarHome(){
	this.navCtrl.navigateForward(['/tabs/profile'])
}
}
