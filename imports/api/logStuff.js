export default function cred(){
  let base = "https://api.foursquare.com/v2/venues/explore?near=";
  let cid = "&section=drinks&venuePhotos=1&client_id=2LZJNFUXYFTHILTIMM4PCULO1LIHSGGWIJO0ZQOVYOQV5RNX";
  let s = "&client_secret=AESC3T343NON4NMD4J0TYITK3HBDBHAZFZ2ACTO4LM44YXCI";
  let v = "&&v=" + new Date().toISOString().slice(0,10).replace(/-/g,"");
  return [base, cid, s, v]
}
