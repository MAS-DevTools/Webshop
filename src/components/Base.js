import CSSProps from "../data/constants/CSSProps";
import LocalStorageProps from "../data/constants/LocalStorageProps";
import { Validator } from "../tools/Validator";

export class Base {
  SwitchPage(selectedPage) {
    this.SetSelectedPageButton(CSSProps.ID.Home, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Servivedesk, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.About, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Dashboard, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Tasks, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Organisation, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Settings, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Login, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Services, selectedPage);
  }

  SetSelectedPageButton(id, selectedPage ) {
    const button = document.getElementById(id);
    if (button) {
      button.style.cssText = CSSProps.Style.NavDeselected;
    }

    if (selectedPage === id) {
      button.style.cssText = CSSProps.Style.NavSelected;

      let cachedVolumeValue = localStorage.getItem(LocalStorageProps.Volume);
      let playSound = false;
      if (Validator.prototype.isEmpty(cachedVolumeValue)) {
        localStorage.setItem(
          LocalStorageProps.Volume,
          CSSProps.UserControl.VolumeOn
        );
        playSound = true;
      }

      playSound =
        localStorage.getItem(LocalStorageProps.Volume) ===
        CSSProps.UserControl.VolumeOn
          ? true
          : false;

      if (playSound) {
        var promise = document.getElementById(id + CSSProps.ID.Audio).play();

        if (promise !== undefined) {
          
          promise.then(_ => {
            // Autoplay started!
           
          }).catch(error => {
            console.log(error);
            // Autoplay was prevented.
          });
          return;
        }else{
          console.log("promise undefined");
        }
      }
    }
  }
}
