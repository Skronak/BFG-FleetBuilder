import {Army} from "@/army";

export function getAssetUrl(name: string) {
    return new URL(`/src/assets/${name}`, import.meta.url).href;
}

export function getArmyIcon(data: Army[], id: number){
    let iconName = data.filter(item => item.id == id).map(item => item.icon)[0];
    return getAssetUrl(iconName);
}