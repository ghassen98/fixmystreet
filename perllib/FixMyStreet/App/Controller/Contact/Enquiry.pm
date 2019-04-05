package FixMyStreet::App::Controller::Contact::Enquiry;

use Moose;
use namespace::autoclean;

BEGIN { extends 'Catalyst::Controller'; }

sub auto : Private {
    my ($self, $c) = @_;
    $c->forward('cobrand_enquiry_check');
    $c->forward('/auth/get_csrf_token');
    $c->cobrand->call_hook('setup_general_enquiries_stash');
}

sub index : Path : Args(0) {
    my ( $self, $c ) = @_;
}

sub submit : Path('submit') : Args(0) {
    my ( $self, $c ) = @_;

    unless ($c->req->method eq 'POST' && $c->forward("/report/new/check_form_submitted") ) {
        $c->res->redirect( '/contact/enquiry' );
        return;
    }

    $c->set_param('pc', '');
    $c->set_param('non_public', 1);
    $c->set_param('skipped', 1);
    $c->stash->{latitude} = 51.469;
    $c->stash->{longitude} = -0.35;

    $c->forward('/report/new/initialize_report');
    $c->forward('/report/new/check_for_category');
    $c->forward('/auth/check_csrf_token');
    $c->forward('/report/new/process_report');
    $c->forward('/report/new/process_user');
    $c->forward('/photo/process_photo');
    return unless $c->forward('check_for_errors');
    $c->forward('/report/new/save_user_and_report');
    $c->forward('/report/new/redirect_or_confirm_creation');

}

sub cobrand_enquiry_check : Private {
    my ( $self, $c ) = @_;

    $c->res->redirect( '/' ) and return unless $c->cobrand->call_hook('allow_general_enquiries');
}

1;
