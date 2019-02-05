Validation rules in `easy-deposit-ui`
=====================================

This document describes the various validation rules that are applied to the forms in `easy-deposit-ui`.
The errors caught in the validation process are accumulated and presented to the user on screen.


Login form
----------

* **username**
  * mandatory field
    * _error text:_ "no username was provided"
* **password**
  * mandatory field
    * _error text:_ "no password was provided"


Deposit form
------------

### Basic information form

* **doi**
  * mandatory field
    * _error text:_ "no doi was provided"
* **languageOfDescription**
  * mandatory field
    * _error text:_ "no language of description was provided"
* **titles**
  * mandatory field array
    * _error text:_ "no titles were provided"
* **description**
  * mandatory field
    * _error text:_ "no description was provided"
* **contributors**
  * mandatory field array: at least one person or organization must be added to the form
    * _error text:_ "no person or organization details were provided"
  * one creator minimum: at least one contributor must have the role 'Creator'
    * _error text:_ "at least one creator is required"
  * every contributor must have at least either an organization or {initial, surname}. All three
    errors are given when only non-required fields are filled in; the second error is shown when
    'surname' is provided, but 'initials' is not (and vise versa regarding the third error)
    * _error text:_ "no organization given"
    * _error text:_ "no initials given"
    * _error text:_ "no surname given"
  * no partial identifiers
    * _error text:_ "no scheme given"
    * _error text:_ "no identifier given"
* **dateCreated**
  * mandatory field
    * _error text:_ "no date created was provided"
* **audiences**
  * mandatory field array
    * _error text:_ "no audiences were provided"
* **alternativeIdentifiers**
  * no partially filled in identifiers
    * _error text:_ "no scheme given"
    * _error text:_ "no identifier given"
* **relatedIdentifiers**
  * if it has one element, only validate iff either `scheme` or `value` is filled in;
    validate always when multiple elements are given
  * no partially filled in identifiers
    * _error text:_ "no scheme given"
    * _error text:_ "no identifier given"
* **relations**
  * if it has one element, only validate iff either `title` or `url` is filled in;
    validate always when multiple elements are given
  * only a qualifier is selected
    * _error text:_ "no title given"
    * _error text:_ "no url given"
  * only a url and qualifier are given
    * _error text:_ "no title given"
  * only a valid URL is allowed
    * _error text:_ "no valid url given"
* **datesIso8601**
  * only validate if multiple elements are provided
  * mandatory value field
    * _error text:_ "no date given"
* **dates**
  * only validate if multiple elements are provided
  * mandatory value field
    * _error text:_ "no date given"

### License and access form

* **rightsHolders**
  * every contributor must have at least either an organization or {initial, surname}. All three
    errors are given when only non-required fields are filled in; the second error is shown when
    'surname' is provided, but 'initials' is not (and vise versa regarding the third error)
    * _error text:_ "no organization given"
    * _error text:_ "no initials given"
    * _error text:_ "no surname given"
  * no partial identifiers
    * _error text:_ "no scheme given"
    * _error text:_ "no identifier given"
* **accessRights**
  * mandatory radio button
    * _error text:_ "no access right was chosen"
* **license**
  * mandatory radio button
    * _error text:_ "no license was chosen"
* **dateAvailable**
  * `dateAvailable` must be earlier than `dateCreated`
    * _error text:_ "'Date available' cannot be a date earlier than 'Date created'"

### Temporal and spatial coverage form

* **spatialPoints**
  * all fields of an entry must be filled in
    * _error text:_ "no scheme given"
    * _error text:_ "no x coordinate given"
    * _error text:_ "no y coordinate given"
* **spatialBoxes**
  * all fields of an entry must be filled in
    * _error text:_ "no scheme given"
    * _error text:_ "no north coordinate given"
    * _error text:_ "no east coordinate given"
    * _error text:_ "no south coordinate given"
    * _error text:_ "no west coordinate given"

### Privacy sensitive data form

* **privacySensitiveDataPresent**
  * mandatory radio button
    * _error text:_ "please determine whether privacy sensitive data is present in this deposit"

### Accept deposit agreement form

* **acceptDepositAgreement**
  * mandatory checkbox
    * _error text:_ "Accept the deposit agreement before submitting this dataset"
