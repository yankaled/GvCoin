'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {gvcoin.ChangeGvCoinOwner} gvcoinChangeOwner
 * @transaction
 */
function onChangeGvCoinOwner(gvcoinChangeOwner) {
    var assetRegistry;
    var id = gvcoinChangeOwner.relatedAsset.assetId;
    return getAssetRegistry('gvcoin.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = gvcoinChangeOwner.newValue;
            return assetRegistry.update(asset);
        });
}